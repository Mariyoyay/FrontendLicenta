import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const handleDownloadPdf = (medicalRecord) => {
    const doc = generatePdfDoc(medicalRecord);
    const fileName = getFileName(medicalRecord);
    doc.save(fileName);
};

const handleDownloadZip = async (medicalRecords) => {
    if (!Array.isArray(medicalRecords) || medicalRecords.length === 0) return;

    const zip = new JSZip();

    for (const record of medicalRecords) {
        const doc = generatePdfDoc(record);
        const fileName = getFileName(record);
        const pdfBlob = doc.output("blob");
        zip.file(fileName, pdfBlob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "Medical_Records.zip");
};

const getFileName = (record) => {
    const name = record.patient
        ? `${record.patient.firstName}_${record.patient.lastName}`
        : "Unknown";
    return `Medical_Record_${name}.pdf`;
};

const generatePdfDoc = (medicalRecord) => {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    const marginLeft = 10;
    const lineSpacing = 8;
    let y = 10;

    doc.setFontSize(16);
    doc.text(
        `Medical Record - ${
            medicalRecord.patient
                ? `${medicalRecord.patient.firstName} ${medicalRecord.patient.lastName}`
                : "Unknown"
        }`,
        marginLeft,
        y
    );
    y += lineSpacing * 2;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("General Observations:", marginLeft, y);
    y += lineSpacing;
    doc.setFont("helvetica", "normal");

    const splitObservations = doc.splitTextToSize(
        medicalRecord.generalObservations ?? "No observations.",
        190
    );
    doc.text(splitObservations, marginLeft, y);
    y += splitObservations.length * lineSpacing + 5;

    doc.setFont("helvetica", "bold");
    doc.text("Medical Entries:", marginLeft, y);
    y += lineSpacing;

    const sortedEntries = () => {
        if (!medicalRecord?.entries) return [];
        return [...medicalRecord.entries].sort((a, b) => {
            const dateA = new Date(a.time);
            const dateB = new Date(b.time);
            return dateA - dateB;
        });
    };

    const tableData = sortedEntries().map((entry) => [
        entry.doctor
            ? `${entry.doctor.firstName} ${entry.doctor.lastName}`
            : "Doctor Unknown",
        new Date(entry.time).toLocaleDateString(),
        entry.content,
    ]);

    autoTable(doc, {
        startY: y,
        head: [["Doctor", "Date", "Content"]],
        body: tableData,
        styles: { fontSize: 10, cellWidth: "wrap" },
        columnStyles: {
            0: { cellWidth: 40 },
            1: { cellWidth: 30 },
            2: { cellWidth: 120 },
        },
    });

    return doc;
};

export { handleDownloadPdf, handleDownloadZip };

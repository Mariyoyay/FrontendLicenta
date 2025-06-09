import PageWithTopAndSideBar from "../pages/PageWithTopAndSideBar.jsx";
import React, {useEffect, useState} from "react";
import api from "../axios/api.jsx";
import {handleDownloadZip} from "./DownloadFunctions.js";

function BackupPage() {
    const [medicalRecordsList, setMedicalRecordsList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchRecords = async () => {
            try {
                const { data } = await api.get("/api/medical_records/get/all");
                setMedicalRecordsList(data);
            } catch (error) {
                console.error("Error fetching medical records: " + error);
            }
        };

        void fetchRecords();

        setLoading(false);
    }, [])


    if (loading) return (
        <PageWithTopAndSideBar>
            Loading...
        </PageWithTopAndSideBar>
    );

    return(
        <PageWithTopAndSideBar>
            <div className="p-6 space-y-6">
                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow-lg shadow-black z-50"
                    onClick={() => handleDownloadZip(medicalRecordsList)}
                >
                    Download .zip BackUp Of All Medical Records.
                </button>
            </div>
        </PageWithTopAndSideBar>
    );
}

export default BackupPage;
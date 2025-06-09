import React, { useEffect, useState } from "react";
import PageWithTopAndSideBar from "../pages/PageWithTopAndSideBar.jsx";
import { format } from "date-fns";
import { useParams} from "react-router-dom";
import api from "../axios/api.jsx";
import CreateEditMedicalEntryForm from "./CreateEditMedicalRecordEntryForm.jsx";
import store from "../redux/store.jsx";
import {Roles} from "../Roles.jsx";
import {handleDownloadPdf} from "./DownloadFunctions.js";

function MedicalRecordPage() {
    const { patient_id} = useParams();
    const [medicalRecord, setMedicalRecord] = useState(null);

    const [sortRecentFirst, setSortRecentFirst] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const [editingObservations, setEditingObservations] = useState(false);
    const [tempObservations, setTempObservations] = useState("");
    const [enableAddForm, setEnableAddForm] = useState(false);
    const [entryToEdit, setEntryToEdit] = useState(null);


    useEffect(() => {

        const fetchRecord = async () => {
            try {
                const { data } = await api.get(`/api/medical_records/get/by_patient/${patient_id}`);
                setMedicalRecord(data);
            } catch (err) {
                console.error("Error fetching medical record:", err);
            }
        }

        void fetchRecord();
    }, [patient_id]);

    const handleSaveObservations = () => {

        const updateRecord = async () => {
            try {
                const { data } = await api.post(`/api/medical_records/edit`, {...medicalRecord, generalObservations: tempObservations});
                setMedicalRecord(data);
                setEditingObservations(false);
            } catch (err) {
                console.error("Error updating medical record:", err);
            }
        }

        void updateRecord();
    };

    const handleAddEntry = (newEntry) => {
        setMedicalRecord({...medicalRecord, entries: [...medicalRecord.entries, newEntry]});
        setEnableAddForm(false);
    }

    const handleEditEntry = (updatedEntry) => {
        setMedicalRecord({...medicalRecord, entries: medicalRecord.entries.map((entry) => entry.id === updatedEntry.id ? updatedEntry : entry)});
        setEntryToEdit(false);
    }

    const handleDeleteEntry = (entry) => {
        const confirm = window.confirm("Are you sure you want to delete thi record entry?\n" + `${entry.time} - ${entry.doctor.lastName}\n${entry.content}`);

        if (!confirm) return;

        const deleteEntry = async () => {
            try {
                const { data: deletedEntry } = await api.delete(`/api/medical_records/entries/manage/${medicalRecord.id}/remove`, {
                    data: entry,
                });
                setMedicalRecord({...medicalRecord, entries: medicalRecord.entries.filter(entry => entry.id !== deletedEntry.id) });
            } catch (err) {
                console.error("Error deleting medical record:", err);
            }
        }

        void deleteEntry();
    }

    const sortEntries = (entries) => {
        if (!entries) return [];
        return entries.sort((a, b) => {
            const dateA = new Date(a.time);
            const dateB = new Date(b.time);
            return sortRecentFirst ? dateB - dateA : dateA - dateB;
        });
    };


    const standardizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }



    if (!medicalRecord) return (
        <PageWithTopAndSideBar>
             <div className="p-4">
                 Loading...
             </div>
         </PageWithTopAndSideBar>
    );

    const filteredEntries = medicalRecord.entries?.filter((entry) => {
        const q = standardizeText(searchQuery);
        const content = standardizeText(entry.content);
        const doctorFirstName = standardizeText(entry.doctor.firstName);
        const doctorLastName = standardizeText(entry.doctor.lastName);

        return (
            content.includes(q) ||
            doctorFirstName.includes(q) ||
            doctorLastName.includes(q)
        );
    });

    const isDoctor = store.getState().auth.roles.includes(Roles.DOCTOR.code);

    return (
        <PageWithTopAndSideBar>
            <div className="p-6 space-y-6">
                <button
                    className="absolute top-5 right-5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                    onClick={() => handleDownloadPdf(medicalRecord)}
                >
                    Download as PDF
                </button>
                <h1 className="text-2xl font-semibold underline text-center">
                    Medical Record - {medicalRecord.patient.firstName + ' ' + medicalRecord.patient.lastName}
                </h1>

                <div>
                    <h2 className="text-lg font-semibold underline">General Observations:</h2>
                    {!editingObservations ? (
                        <>
                            <div className="bg-blue-200 text-white p-4 rounded-md mt-2 whitespace-pre-line">
                                {medicalRecord.generalObservations || "No general observations."}
                            </div>
                            {isDoctor && (
                                <button
                                    className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                                    onClick={() => {
                                        setTempObservations(medicalRecord.generalObservations || '');
                                        setEditingObservations(true);
                                    }}
                                >
                                    Change
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="mt-2">
                            <textarea
                                className="w-full h-32 p-2 rounded border border-gray-300"
                                value={tempObservations}
                                onChange={(e) => setTempObservations(e.target.value)}
                            />
                            <div className="mt-2 space-x-2">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                                    onClick={handleSaveObservations}
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded"
                                    onClick={() => setEditingObservations(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <h2 className="text-lg font-semibold underline">Entries:</h2>
                <div className="flex space-x-2">
                    <button
                        className={`bg-${sortRecentFirst ? 'green-500' : 'gray-300'} hover:bg-orange-500`}
                        onClick={() => setSortRecentFirst(true)}
                    >
                        Most recent 1<sup>st</sup>
                    </button>
                    <button
                        className={`bg-${!sortRecentFirst ? 'green-500' : 'gray-300'} hover:bg-orange-500`}
                        onClick={() => setSortRecentFirst(false)}
                    >
                        Oldest 1<sup>st</sup>
                    </button>
                </div>
                <div className="flex items-center justify-center gap-2 mb-8 w-full">
                    <label className="font-medium"> 🔍 </label>
                    <input
                        type="text"
                        placeholder="Search by content or doctor"
                        className="flex-grow border border-blue-900 px-4 py-2 rounded-md text-gray-700"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {isDoctor && (<button
                        onClick={() => setEnableAddForm(true)}
                        className="text-gray-600 hover:text-black text-2xl font-bold"
                    >
                        Add Entry
                    </button>)}
                </div>

                <div className="space-y-4  ">
                    {sortEntries(filteredEntries).map((entry) => (
                        <div key={entry.id} className="bg-blue-700 text-white p-4 rounded-lg shadow">
                            <p><strong>Doctor — {entry.doctor.firstName + ' ' + entry.doctor.lastName}</strong></p>
                            <p>{format(new Date(entry.time), "dd/MM/yyyy")}</p>
                            <p className="my-2 whitespace-pre-line">{entry.content || "No content"}</p>
                            {entry.edited && (<p className="my-2 whitespace-pre-line">(Edited)</p>)}
                            {isDoctor && (<div className="flex items-center justify-end gap-2">
                                <button
                                    onClick={() => setEntryToEdit(entry)}
                                    className="bg-yellow-500 text-white hover:text-black text-xs font-bold"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteEntry(entry)}
                                    className="bg-red-500 text-white hover:text-black text-xs font-bold"
                                >
                                    Delete
                                </button>
                            </div>)}
                        </div>
                    ))}
                </div>

                {enableAddForm && (
                    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-100">
                        <CreateEditMedicalEntryForm
                            medicalRecord={medicalRecord}
                            onSubmit={handleAddEntry}
                            onExit={() => setEnableAddForm(false)}
                        />
                    </div>
                )}

                {entryToEdit && (
                    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-100">
                        <CreateEditMedicalEntryForm
                            medicalRecord={medicalRecord}
                            entry={entryToEdit}
                            onSubmit={handleEditEntry}
                            onExit={() => setEntryToEdit(null)}
                        />
                    </div>
                )}

            </div>
        </PageWithTopAndSideBar>
    );
}

export default MedicalRecordPage;

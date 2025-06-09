import React, {useState} from "react";
import {registerLocale} from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import api from "../axios/api.jsx";

function CreateEditMedicalEntryForm ({ medicalRecord, entry: initialEntry, onSubmit, onExit }) {
    const [entry, setEntry] = useState(initialEntry || null);
    const [tempContent, setTempContent] = useState(entry?.content || "");


    registerLocale("en-GB", enGB);


    const handleSubmit = () => {
        const addEntry = async () => {
            try {
                const {data: newRecordEntry} = await api.post(`/api/medical_records/entries/manage/${medicalRecord.id}/add`, {content: tempContent});
                onSubmit(newRecordEntry);
            } catch (error) {
                console.error("Error adding record entry: ", error);
            }
        };

        const editEntry = async () => {
            try {
                const {data: updatedRecordEntry} = await api.post(`/api/medical_records/entries/manage/edit`, {...entry, content: tempContent});
                onSubmit(updatedRecordEntry);
            } catch (error) {
                console.error("Error adding record entry: ", error);
            }
        }

        if (entry) void editEntry();
        else void addEntry();
    };


    return (
        <div className="bg-white text-black p-6 rounded-xl shadow-xl space-y-6 relative">
            <button
                onClick={onExit}
                className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl font-bold"
                aria-label="Close modal"
            >
                &times;
            </button>

            <h2 className="text-center text-2xl font-bold text-gray-800">Add New Entry</h2>

            <div className="flex-1 items-center justify-between gap-2">
                <label className="font-medium">Content</label>
                <textarea
                    className="w-full min-h-65 bg-blue-100 text-black p-2 rounded resize-none"
                    value={tempContent}
                    placeholder="e.g. Extracted a tooth"
                    onChange={(e) => setTempContent(e.target.value)}
                />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t mt-4">
                <button
                    className={`bg-${entry ? 'yellow-500':'green-600'} text-black px-4 py-2 rounded hover:bg-gray-500 font-medium`}
                    onClick={handleSubmit}
                >
                    {entry ? "Edit" : "Add"}
                </button>
            </div>
        </div>
    );
}

export default CreateEditMedicalEntryForm;
import React, { useEffect, useState } from "react";
import api from "./axios/api.jsx";
import SelectUserModal from "./OfficeSchedule/SelectUserModal.jsx";
import {Roles} from "./Roles.jsx";
import PageWithTopAndSideBar from "./pages/PageWithTopAndSideBar.jsx";

const   AdminManageOfficesPage = () => {
    const [offices, setOffices] = useState([]);

    const [query, setQuery] = useState("");

    const [editingOffice, setEditingOffice] = useState(null);
    const [enableAddOffice, setEnableAddOffice] = useState(false);
    const [addingDoctorOffice, setAddingDoctorOffice] = useState(null);

    useEffect(() => {
        const fetchOffices = async () => {
            try {
                const { data } = await api.get(`/api/offices/get/all`);
                setOffices(data);
            } catch (err) {
                console.error("Error loading data:", err);
            }
        };
        void fetchOffices();
    }, []);

    const handleDelete = (office) => {
        if (!window.confirm("Are you sure you want to delete this office?")) return;

        const deleteOffice = async () => {
            try {
                const {data} = await api.delete(`/api/offices/manage/delete`, {data: office});

                setOffices(prev => prev.filter(o => o.id !== data.id));
            } catch (err) {
                console.error("Delete error:", err);
            }
        }

        void deleteOffice();
    };

    const standardizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filteredOffices = offices.filter(office => {
        const q = standardizeText(query);
        const id = standardizeText(String(office.id));
        const name = standardizeText(office.name || "");
        const description = standardizeText(office.description || "");

        return (
            id.includes(q) ||
            name.includes(q) ||
            description.includes(q)
        );
    });

    const handleAddNewDoctorToOffice = (doc, office) => {
        if (office.doctors.map(d => d.id).includes(doc.id)) {
            // NEEDS Something else
            window.confirm(`Doctor ${doc.firstName + ' ' + doc.lastName} is already assigned to office ` + office.id + ' - ' + office.name);
            return;
        }


        const confirmed = window.confirm(`Are you sure you want to add the doctor "${doc.firstName + ' ' + doc.lastName}" to the office ${office.id + ' - ' + office.name}?`);

        if (!confirmed) return;

        const addDoctorToOffice = async () => {
            try {
                const { data: updatedOffice } = await api.post(`/api/offices/doctors/manage/${office.id}/add`, doc);
                setOffices(prev => prev.map(off => off.id === office.id ? updatedOffice : off));
            } catch (err) {
                console.error("Error adding new doctor:", err);
            }
        }

        void addDoctorToOffice();
        setAddingDoctorOffice(null);
    }

    const handleRemoveDoctorFromOffice = (doc, office) => {
        const confirmed = window.confirm(`Are you sure you want to delete the doctor "${doc.firstName + ' ' + doc.lastName}" from the office ${office.id + ' - ' + office.name}?`);

        if (!confirmed) return;

        const removeDoctorFromOffice = async () => {
            try {
                const { data: updatedOffice } = await api.delete(`/api/offices/doctors/manage/${office.id}/remove`, {data: doc} );
                setOffices(prev => prev.map(off => off.id === office.id ? updatedOffice : off));

            } catch (error) {
                console.error("Error deleting doctor", error);
            }
        }

        void removeDoctorFromOffice();
    }

    return (
        <PageWithTopAndSideBar>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-center mb-6">Manage Offices</h2>

                <div className="flex gap-2 mb-4">
                    <button className="p-2 border border-blue-900 rounded-md hover:bg-blue-100">
                        🔍
                    </button>
                    <input
                        type="text"
                        placeholder="Search by id, name or description"
                        className="border border-blue-900 px-4 py-2 rounded-md text-gray-700"
                        value={query || ""}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={() => {
                            setEnableAddOffice(true);
                        }}
                    >
                        Add Office
                    </button>
                </div>

                {filteredOffices.map((office) => (
                    <div key={office.id} className="bg-white p-4 mb-4 rounded shadow border border-gray-300">
                        <h3 className="text-xl font-semibold">Office {office.id} - {office.name}</h3>
                        <p className="text-sm text-gray-700">{office.description}</p>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {office.doctors.length > 0 ? (
                                office.doctors.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="relative border border-gray-300 rounded-lg p-3 shadow-sm bg-white"
                                    >
                                        <div className="font-semibold">{doc.firstName} {doc.lastName}</div>
                                        <div className="text-sm text-gray-600">📧 {doc.email}</div>
                                        <div className="text-sm text-gray-600">📞 {doc.phone}</div>

                                        <button
                                            onClick={() => handleRemoveDoctorFromOffice(doc, office)}
                                            className="absolute w-5 h-5 top-1 right-1 text-gray-600 hover:text-white hover:bg-red-500 text-2xl font-bold flex justify-center items-center"
                                            aria-label="Close modal"
                                        >
                                            &minus;
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="italic text-gray-500">No Doctors assigned yet.</div>
                            )}

                            <div
                                onClick={() => setAddingDoctorOffice(office)}
                                className="flex items-center justify-center border-2 border-dashed border-blue-500 text-blue-500 font-semibold rounded-lg cursor-pointer hover:bg-blue-50 transition"
                            >
                                + Add Doctor
                            </div>
                        </div>
                        <div className="mt-3 flex justify-between gap-3">
                            <button
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                onClick={() => handleDelete(office)}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600"
                                onClick={() => {
                                    setEditingOffice(office);
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}

                {editingOffice && (
                    <OfficeForm
                        office={editingOffice}
                        onCancel={() => {
                            setEditingOffice(null);
                        }}
                        onSave={(editedOffice) => {
                            setOffices(prev => prev.map(office => office.id === editedOffice.id ? editedOffice : office));
                            setEditingOffice(null);
                        }}
                    />
                )}

                {enableAddOffice && (
                    <OfficeForm
                        onCancel={() => setEnableAddOffice(false)}
                        onSave={(newOffice) => {
                            setOffices([...offices, newOffice]);
                            setEnableAddOffice(null);
                        }}
                    />
                )}

                {addingDoctorOffice && (
                    <SelectUserModal
                        byRoles={[Roles.DOCTOR]}
                        onSelect={(newDoctor) => handleAddNewDoctorToOffice(newDoctor, addingDoctorOffice)}
                        onClose={() => setAddingDoctorOffice(null)}
                    />
                )}

            </div>
        </PageWithTopAndSideBar>
    );
};

const OfficeForm = ({office: initialOffice, onCancel, onSave}) => {
    const [office, setOffice] = useState(initialOffice ? initialOffice : {
        name: "",
        description: "",
    });

    const handleSubmit = () => {
        const updateOffice = async () => {
            try {
                const {data} = await api.post("/api/offices/manage/update", office);
                onSave(data);
            } catch (error) {
                console.error("Error updating office", error);
            }
        }

        const addOffice = async () => {
            try {
                const {data} = await api.post("/api/offices/manage/add", office);
                onSave(data);
            } catch (error) {
                console.error("Error updating office", error);
            }
        }

        if (initialOffice) {
            void updateOffice();
        } else {
            void addOffice();
        }

    };

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">{initialOffice ? "Edit Office" : "Add Office"}</h3>

                <label className="block mb-2 font-medium">Name</label>
                <input
                    type="text"
                    className="border p-2 w-full mb-4 rounded"
                    value={office.name || ""}
                    onChange={(e) => setOffice({...office, name: e.target.value})}
                />

                <label className="block mb-2 font-medium">Description</label>
                <textarea
                    className="border p-2 w-full mb-4 rounded"
                    value={office.description || ""}
                    onChange={(e) => setOffice({...office, description: e.target.value})}
                />

                <div className="flex justify-end gap-2">
                    <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSubmit}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminManageOfficesPage;

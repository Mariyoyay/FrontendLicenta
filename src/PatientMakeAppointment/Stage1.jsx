import React, {useEffect, useState} from "react";
import api from "../axios/api.jsx";

function Stage1 ({onSelected}) {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const { data } = await api.get("api/users/get/doctors/for_patients");
                setDoctors(data);
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };

        void fetchUsers();
        setLoading(false);
    }, []);



    const standardizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    const filteredDoctors = doctors.filter((doctor) => {
        const q = standardizeText(searchQuery);
        const firstNameLastName = standardizeText(doctor.firstName + ' ' + doctor.lastName);
        const lastNameFirstName = standardizeText(doctor.lastName + ' ' + doctor.firstName);

        return (
            firstNameLastName.includes(q) || lastNameFirstName.includes(q)
        );
    });



    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-center">Select a Doctor</h2>

            <div className="bg-white rounded-xl p-6 shadow-2xl w-full max-w-lg relative">
                <div className="flex items-center justify-center gap-2 mb-8 w-full">
                    <label className="font-medium"> 🔍 </label>
                    <input
                        type="text"
                        placeholder="Search by name, email or phone number"
                        className="flex-grow border border-blue-900 px-4 py-2 rounded-md text-gray-700"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>


                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : (
                    <ul className="space-y-2 max-h-80 overflow-y-auto">
                        {filteredDoctors.map((doctor) => (
                            <li
                                key={doctor.id}
                                className="bg-blue-100 hover:bg-blue-200 p-3 rounded cursor-pointer"
                                onClick={() => onSelected(doctor)}
                            >
                                <p className="font-semibold">Dr. {doctor.firstName} {doctor.lastName}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default Stage1;
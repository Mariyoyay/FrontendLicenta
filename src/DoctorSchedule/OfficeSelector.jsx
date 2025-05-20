import React, {useEffect, useState} from "react";
import api from "../axios/api.jsx";

function OfficeSelector({onSelect}) {

    const [offices, setOffices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const { data } = await api.get("api/offices/get/all");
                setOffices(data);
            } catch (error) {
                console.error("Failed to fetch offices", error);
            }
        };

        void fetchUsers();
        setLoading(false);

    }, []);

    const standardizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    const filteredOffices = offices.filter((office) => {
        const q = standardizeText(searchQuery);
        const id = standardizeText(String(office.id));
        const name = standardizeText(office.name);
        const description = standardizeText(office.description);

        return (
            id.includes(q) ||
            name.includes(q) ||
            description.includes(q)
        );
    });

    return (
        <>
            <h2 className="text-xl font-bold mb-4 text-center">
                Select an Office
            </h2>

            <div className="flex items-center justify-center gap-2 mb-8 w-full">
                <label className="font-medium"> 🔍 </label>
                <input
                    type="text"
                    placeholder="Search by id, name or description"
                    className="flex-grow border border-blue-900 px-4 py-2 rounded-md text-gray-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <ul className="space-y-2 max-h-80 overflow-y-auto">
                    {filteredOffices.map((office) => (
                        <li
                            key={office.id}
                            className="bg-blue-100 hover:bg-blue-200 p-3 rounded cursor-pointer"
                            onClick={() => onSelect(office)}
                        >
                            <p className="font-semibold">Office {office.id} - {office.name}</p>
                            <p className="text-sm text-gray-600">{office.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default OfficeSelector;
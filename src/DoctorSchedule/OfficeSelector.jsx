import React, {useEffect, useState} from "react";
import api from "../axios/api.jsx";

function OfficeSelector({onSelect}) {

    const [offices, setOffices] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <>
            <h2 className="text-xl font-bold mb-4 text-center">
                Select an Office
            </h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <ul className="space-y-2 max-h-80 overflow-y-auto">
                    {offices.map((office) => (
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
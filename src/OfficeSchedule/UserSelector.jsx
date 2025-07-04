import React, { useState, useEffect } from "react";
import api from "../axios/api.jsx";
import {Roles} from "../Roles.jsx";
import CreateEditUserForm from "../AuthenticationPages/CreateEditUserForm.jsx"; // Assumes your API client is set up

const UserSelector = ({ fromList: givenUsers,  byRoles: roles, enableAdd, onSelect, onClose }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");
    const [enableAddForm, setEnableAddForm] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            if (roles && roles.length > 0) {
                try {
                    const allUsers = [];

                    for (const role of roles) {
                        const { data } = await api.get(`api/users/get/by_role/${role.code}`);
                        allUsers.push(...data);
                    }
                    setUsers(allUsers);//.filter(filterCondition ? (user) => filterCondition(user) : () => {return true;}));
                } catch (error) {
                    console.error("Error fetching users: " + error);
                }
            } else {
                try {
                    const { data } = await api.get("api/users/get/all");
                    setUsers(data);//.filter(filterCondition ? (user) => filterCondition(user) : () => {return true;}));
                } catch (error) {
                    console.error("Failed to fetch users", error);
                }
            }
        };

        if(!givenUsers) void fetchUsers();
        else setUsers(givenUsers);

        setLoading(false);
    }, [givenUsers, roles]);



    const standardizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    const filteredUsers = users.filter((user) => {
        const q = standardizeText(searchQuery);
        const firstNameLastName = standardizeText(user.firstName + ' ' + user.lastName);
        const lastNameFirstName = standardizeText(user.lastName + ' ' + user.firstName);
        const email = standardizeText(user.email);
        const phone = standardizeText(user.phone);

        return (
            email.includes(q) ||
            firstNameLastName.includes(q) || lastNameFirstName.includes(q) ||
            phone.includes(q)
        );
    });


    return (
        <>
            <div className="bg-white rounded-xl p-6 shadow-2xl w-full max-w-lg relative">
                {onClose && (<button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl font-bold"
                    aria-label="Close modal"
                >
                    &times;
                </button>)}
                <h2 className="text-xl font-bold mb-4 text-center">
                    {(roles && roles.length > 0) ?
                        `Select ${roles[0] === Roles.ADMIN || roles[0] === Roles.EMPLOYEE ? "an" : "a"} ${roles.map(r => r.beautiful).join('/')}`
                        :
                        "Select a User"
                    }
                </h2>

                <div className="flex items-center justify-center gap-2 mb-8 w-full">
                    <label className="font-medium"> 🔍 </label>
                    <input
                        type="text"
                        placeholder="Search by name, email or phone number"
                        className="flex-grow border border-blue-900 px-4 py-2 rounded-md text-gray-700"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {enableAdd === true && !enableAddForm && (<button
                        onClick={() => setEnableAddForm(prev => !prev)}
                        className="text-gray-600 hover:text-black text-2xl font-bold"
                        aria-label="Close modal"
                    >
                        {"Add User"}
                    </button>)}
                </div>


                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : (
                    <ul className="space-y-2 max-h-80 overflow-y-auto">
                        {filteredUsers.map((user) => (
                            <li
                                key={user.id}
                                className="bg-blue-100 hover:bg-blue-200 p-3 rounded cursor-pointer"
                                onClick={() => onSelect(user)}
                            >
                                <p className="font-semibold">{user.firstName} {user.lastName}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                                <p className="text-sm text-gray-600">{user.phone}</p>
                            </li>
                        ))}
                    </ul>
                )}

            </div>
            {enableAddForm && (
                <CreateEditUserForm onSave={(newUser) => {
                    setUsers([...users, newUser]);
                    setEnableAddForm(false);
                }} onExit={() => setEnableAddForm(false)} />
            )}
        </>
    );
};

export default UserSelector;

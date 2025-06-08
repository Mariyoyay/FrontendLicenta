import React, {useEffect, useState} from "react";
import api from "./axios/api.jsx";
import UserDetails from "./UserDetails.jsx";
import CreateEditUserForm from "./AuthenticationPages/CreateEditUserForm.jsx";
import {Roles} from "./Roles.jsx";
import PageWithTopAndSideBar from "./pages/PageWithTopAndSideBar.jsx";



const EmployeeManageUsersPage = () => {
    const [searchBy, setSearchBy] = useState("All");
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);

    const [enableAddModal, setEnableAddModal] = useState(false);
    const [editedUser, setEditedUser] = useState(null);

    useEffect(() => {

        const fetchUsers = async () => {
            try{
                const { data } = await api.get("api/users/get/all");
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users: " + error);
            }
        }

        void fetchUsers();
    }, []);


    const standardizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filteredUsers = users.filter((user) => {
        const q = standardizeText(query);
        const firstNameLastName = standardizeText(user.firstName + ' ' + user.lastName);
        const lastNameFirstName = standardizeText(user.lastName + ' ' + user.firstName);
        const email = standardizeText(user.email);
        const phone = standardizeText(user.phone);

        if (searchBy === "Email") return email.includes(q);
        if (searchBy === "Name") return firstNameLastName.includes(q) || lastNameFirstName.includes(q);
        if (searchBy === "Phone") return phone.includes(q);
        return (
            email.includes(q) ||
            firstNameLastName.includes(q) || lastNameFirstName.includes(q) ||
            phone.includes(q)
        );
    });

    return (
        <PageWithTopAndSideBar>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
                    Manage Patients<br/>
                    <span className="text-lg font-normal">Edit User Details & Add New Users</span>
                </h2>

                <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                    <label className="font-medium">Search by:</label>
                    <select
                        className="border border-blue-900 px-4 py-2 rounded-md"
                        value={searchBy}
                        onChange={(e) => setSearchBy(e.target.value)}
                    >
                        <option value="Email">Email</option>
                        <option value="Name">Name</option>
                        <option value="Phone">Phone Number</option>
                        <option value="All">All</option>
                    </select>
                    <input
                        type="text"
                        placeholder="eg. John Doe"
                        className="border border-blue-900 px-4 py-2 rounded-md text-gray-700"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="p-2 border border-blue-900 rounded-md hover:bg-blue-100">
                        🔍
                    </button>
                    <button
                        className="bg-green-600 text-black px-4 py-2 rounded hover:bg-gray-500 font-medium"
                        onClick={() => {
                            setEnableAddModal(true);
                        }}
                    >
                        Add User
                    </button>
                </div>

                {filteredUsers.map((user) => (
                    <div
                        key={user.email}
                        className="border-2 border-red-500 bg-yellow-100 rounded-xl p-4 mb-6 shadow-md"
                    >
                        <div className="mb-4">
                            <UserDetails user={user}/>
                        </div>

                        <div className="flex justify-center flex-wrap gap-3">
                            {Roles.all.map((role) => {
                                const isEnabled = user.roles.includes(role.code);
                                return (
                                    <div
                                        key={role.code}
                                        className={`px-4 py-2 rounded-md text-white text-sm font-bold flex flex-col items-center justify-center min-w-[90px]
                      ${isEnabled ? "bg-red-600" : "bg-black"}`}
                                    >
                                        {role.beautiful}
                                        <span className="text-xs font-normal mt-1">
                      {isEnabled ? "enabled" : "disabled"}
                    </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-4 flex justify-end items-center">
                            <button
                                className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-gray-500 font-medium"
                                onClick={() => {
                                    setEditedUser(user);
                                }}
                            >
                                Edit User Details
                            </button>
                        </div>
                    </div>
                ))}

                {enableAddModal && (
                    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
                        <CreateEditUserForm onSave={(newUser) => {
                            setUsers([...users, newUser]);
                            setEnableAddModal(false);
                        }} onExit={() => setEnableAddModal(false)} />
                    </div>
                )}

                {editedUser && (
                    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
                        <CreateEditUserForm user={editedUser} onSave={(editedUser) => {
                            setUsers((prev) => prev.map((user) => user.id === editedUser.id ? editedUser : user));
                            setEditedUser(null);
                        }} onExit={() => setEditedUser(null)}/>
                    </div>
                )}
            </div>
        </PageWithTopAndSideBar>
    );
};

export default EmployeeManageUsersPage;

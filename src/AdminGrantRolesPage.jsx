import React, {useEffect, useState} from "react";
import api from "./axios/api.jsx";
import UserDetails from "./UserDetails.jsx";


// should be a get all roles form the backend :))))
const roleList = ["ROLE_PATIENT", "ROLE_EMPLOYEE", "ROLE_DOCTOR", "ROLE_ADMIN"];

const AdminGrantRolesPage = () => {
    const [searchBy, setSearchBy] = useState("All");
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);

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
    }

    const filteredUsers = users.filter((user) => {
        const q = standardizeText(query);
        const name = standardizeText(user.firstName + ' ' + user.lastName);
        const email = standardizeText(user.email);
        const phone = standardizeText(user.phone);

        if (searchBy === "Email") return email.includes(q);
        if (searchBy === "Name") return name.includes(q);
        if (searchBy === "Phone") return phone.includes(q);
        return (
            email.includes(q) ||
            name.includes(q) ||
            phone.includes(q)
        );
    });

    const toggleRole = async (user, role) => {
        const hasRole = user.roles.includes(role);
        const url = `/api/users/roles/manage/${user.email}/${hasRole ? 'remove' : 'add'}`;

        const roles = [role];

        try{
            const {data: updatedUser} = !hasRole ? await api.post(url, roles) : await api.delete(url, {data: roles});
            setUsers(prev => prev.map(u => (u.email === updatedUser.email ? updatedUser : u)));
        } catch (error) {
            console.error("Error fetching roles: " + error);
        }

    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
                Admin Page<br />
                <span className="text-lg font-normal">Add Roles to Different Users</span>
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
            </div>

            {filteredUsers.map((user) => (
                <div
                    key={user.email}
                    className="border-2 border-red-500 bg-yellow-100 rounded-xl p-4 mb-6 shadow-md"
                >
                    <div className="mb-4">
                        <UserDetails user={user} />
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {roleList.map((role) => {
                            const isEnabled = user.roles.includes(role);
                            return (
                                <button
                                    key={role}
                                    onClick={() => toggleRole(user, role)}
                                    className={`px-4 py-2 rounded-md text-white text-sm font-bold flex flex-col items-center justify-center min-w-[90px]
                  ${isEnabled ? "bg-red-600 hover:bg-red-700" : "bg-black hover:bg-gray-800"}`}
                                >
                                    {role.substring(5)}
                                    <span className="text-xs font-normal mt-1">
                  {isEnabled ? "enabled" : "disabled"}
                </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminGrantRolesPage;

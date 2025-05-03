import React, {useEffect, useState} from "react";
import "./AdminGrantRolesPage.css";
import api from "./axios/api.jsx";


// should be a get all roles form the backend :))))
const roleList = ["ROLE_PATIENT", "ROLE_EMPLOYEE", "ROLE_DOCTOR", "ROLE_ADMIN"];

const AdminGrantRolesPage = () => {
    const [searchBy, setSearchBy] = useState("Both");
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {

        const fetchUsers = async () => {
            try{
                const { data } = await api.get("api/users/getUsers");
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users: " + error);
            }
        }

        void fetchUsers();
    }, []);


    const filteredUsers = users.filter((user) => {
        const q = query.toLowerCase();
        const name = user.firstName + ' ' + user.lastName;

        if (searchBy === "Email") return user.email.toLowerCase().includes(q);
        if (searchBy === "Name") return name.toLowerCase().includes(q);
        return (
            user.email.toLowerCase().includes(q) ||
            name.toLowerCase().includes(q)
        );
    });

    const toggleRole = async (user, role) => {
        const hasRole = user.rolesAsString.includes(role);
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
        <div className="container">
            <h2 className="header">
                Admin Page<br />Add Roles to Different Users
            </h2>

            <div className="search-bar">
                <select
                    className="select"
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                >
                    <option value="Email">Email</option>
                    <option value="Name">Name</option>
                    <option value="Both">Both</option>
                </select>
                <input
                    type="text"
                    placeholder="eg. John Doe"
                    className="input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button>🔍</button>
            </div>

            {filteredUsers.map((user) => (
                <div
                    key={user.email}
                    className="user-card"
                >
                    <div className="user-info">
                        <strong>First Name:</strong> {user.firstName}
                        <br />
                        <strong>Last Name:</strong> {user.lastName}
                        <br />
                        <strong>Email:</strong> {user.email}
                    </div>
                    <div className="roles">
                        {roleList.map((role) => (
                            <button
                                key={role}
                                onClick={() => toggleRole(user, role)}
                                className={`role-button ${user.rolesAsString.includes(role) ? "enabled" : "disabled"}`}
                            >
                                {role.substring(5)}
                                <div style={{ fontSize: "0.75rem" }}>
                                    {user.rolesAsString.includes(role) ? "enabled" : "disabled"}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminGrantRolesPage;

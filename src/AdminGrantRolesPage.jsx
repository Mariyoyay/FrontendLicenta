import React, { useState } from "react";
import "./AdminGrantRolesPage.css";

const dummyUsers = [
    {
        id: 1,
        name: "employee 1",
        email: "1@g.com",
        roles: ["ROLE_PATIENT", "ROLE_EMPLOYEE"],
    },
    {
        id: 2,
        name: "doctor 1",
        email: "1@y.com",
        roles: ["ROLE_PATIENT", "ROLE_EMPLOYEE", "ROLE_DOCTOR"],
    },
    {
        id: 3,
        name: "ADMIN",
        email: "a@a.com",
        roles: ["ROLE_ADMIN"],
    },
];

const roleList = ["ROLE_PATIENT", "ROLE_EMPLOYEE", "ROLE_DOCTOR", "ROLE_ADMIN"];

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

const AdminGrantRolesPage = () => {
    const [searchBy, setSearchBy] = useState("Both");
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState(dummyUsers);

    const filteredUsers = users.filter((user) => {
        const q = query.toLowerCase();
        if (searchBy === "Email") return user.email.toLowerCase().includes(q);
        if (searchBy === "Name") return user.name.toLowerCase().includes(q);
        return (
            user.email.toLowerCase().includes(q) ||
            user.name.toLowerCase().includes(q)
        );
    });

    const toggleRole = (userId, role) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === userId ? {

                    ...user,
                    roles: user.roles.includes(role) ?
                        user.roles.filter(r => r !== role) : [...user.roles, role],

                } : user
            )
        );
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
                    key={user.id}
                    className="user-card"
                >
                    <div className="user-info">
                        <strong>Name:</strong> {user.name}
                        <br />
                        <strong>Email:</strong> {user.email}
                    </div>
                    <div className="roles">
                        {roleList.map((role) => (
                            <button
                                key={role}
                                onClick={() => toggleRole(user.id, role)}
                                className={`role-button ${user.roles.includes(role) ? "enabled" : "disabled"}`}
                            >
                                {role}
                                <div style={{ fontSize: "0.75rem" }}>
                                    {user.roles.includes(role) ? "enabled" : "disabled"}
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

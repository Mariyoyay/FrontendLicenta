import React, { useState } from "react";
import store from "../redux/store.jsx";
import {Roles} from "../Roles.jsx";
import {useNavigate} from "react-router-dom";


export default function NavigationMenu() {
    const navigate = useNavigate();

    const [openDropdowns, setOpenDropdowns] = useState(["admin", "doctor", "patient","employee"]);

    const toggleDropdown = (dropdown) => {
        if (openDropdowns.includes(dropdown)){
            setOpenDropdowns(prev => prev.filter((od) => od !== dropdown ));
        } else {
            setOpenDropdowns(prev => [...prev, dropdown]);
        }
    };

    const userRoles = store.getState().auth.roles;

    return (
        <div className="mb-6 p-4 bg-yellow-200 rounded-lg shadow text-black w-64">
            <h2 className="text-xl font-bold mb-4 border-b border-yellow-400 pb-2">Navigate</h2>

            {/* Home Button */}
            <button
                className="w-full text-left px-2 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded"
                onClick={() => navigate(`/home`)}
            >
                Home
            </button>

            {/* Admin Section */}
            {userRoles.includes(Roles.ADMIN.code) && (
                <div className="mt-4">
                    <button
                        className="w-full text-left font-semibold px-2 py-1 rounded hover:bg-yellow-300"
                        onClick={() => toggleDropdown("admin")}
                    >
                        Admin {openDropdowns.includes("admin") ? "▲" : "▼"}
                    </button>
                    {openDropdowns.includes("admin") && (
                        <div className="pl-4 mt-1 space-y-1">
                            <button
                                className="w-full text-left bg-blue-500 text-white hover:bg-blue-600 rounded px-2 py-1"
                                onClick={() => navigate("/admin/users")}
                            >
                                Manage Users' Roles
                            </button>
                            <button
                                className="w-full text-left bg-blue-500 text-white hover:bg-blue-600 rounded px-2 py-1"
                                onClick={() => navigate("/admin/offices")}
                            >
                                Manage Offices' Doctors
                            </button>
                            <button className="w-full text-left bg-blue-500 text-white hover:bg-blue-600 rounded px-2 py-1">
                                Backup Medical Data
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Doctor Section */}
            {userRoles.includes(Roles.DOCTOR.code) && (
                <div className="mt-4">
                    <button
                        className="w-full text-left font-semibold px-2 py-1 rounded hover:bg-yellow-300"
                        onClick={() => toggleDropdown("doctor")}
                    >
                        Doctor {openDropdowns.includes("doctor") ? "▲" : "▼"}
                    </button>
                    {openDropdowns.includes("doctor")  && (
                        <div className="pl-4 mt-1 space-y-1">
                            <button
                                className="w-full text-left bg-blue-500 text-white hover:bg-blue-600 rounded px-2 py-1"
                                onClick={() => navigate("/doctor/my-schedule")}
                            >
                                My Schedule
                            </button>
                            <button className="w-full text-left bg-blue-500 text-white hover:bg-blue-600 rounded px-2 py-1">
                                Manage Medical Record
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Employee Section */}
            {(userRoles.includes(Roles.EMPLOYEE.code) || userRoles.includes(Roles.DOCTOR.code)) && (
                <div className="mt-4">
                    <button
                        className="w-full text-left font-semibold px-2 py-1 rounded hover:bg-yellow-300"
                        onClick={() => toggleDropdown("employee")}
                    >
                        Employee {openDropdowns.includes("employee")  ? "▲" : "▼"}
                    </button>
                    {openDropdowns.includes("employee") && (
                        <div className="pl-4 mt-1 space-y-1">
                            <button
                                className="w-full relative text-left bg-blue-500 text-white hover:bg-blue-600 rounded px-2 py-1"
                                onClick={() => navigate("/office")}
                            >
                                Office Schedule
                            </button>

                            <button
                                className="w-full text-left bg-blue-500 text-white hover:bg-blue-600 rounded px-2 py-1"
                                onClick={() => navigate("/employee/users")}
                            >
                                Manage Patients
                            </button>
                            <button className="w-full text-left bg-blue-500 text-white hover:bg-blue-600 rounded px-2 py-1">
                                View Medical Records
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Patient Section */}
            {userRoles.includes(Roles.PATIENT.code) && (
                <div className="mt-4">
                    <button
                        className="w-full text-left font-semibold px-2 py-1 rounded hover:bg-yellow-300"
                        onClick={() => toggleDropdown("patient")}
                    >
                        Patient {openDropdowns.includes("patient")  ? "▲" : "▼"}
                    </button>
                    {openDropdowns.includes("patient") && (
                        <div className="pl-4 mt-1 space-y-1">
                            <button
                                className="w-full text-left bg-blue-500 text-white hover:bg-blue-600 rounded px-2 py-1"
                                onClick={() => navigate('/patient/my-appointments')}
                            >
                                My Appointments
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

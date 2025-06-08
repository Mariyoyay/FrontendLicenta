import React, { useState } from "react";
import api from "../axios/api.jsx";
import PageWithTopAndSideBar from "../pages/PageWithTopAndSideBar.jsx";
import Stage1 from "./Stage1.jsx";
import Stage2 from "./Stage2.jsx";
import {useNavigate} from "react-router-dom";

const MakePatientAppointmentPage = () => {
    const [stage, setStage] = useState(1);
    const [doctor, setDoctor] = useState(null);
    const [startTime, setStartTime] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const handleDoctorSelect = (selectedDoctor) => {
        setDoctor(selectedDoctor);
        setStage(2);
    };

    const handleStartTimeSelect = (selectedStartTime) => {
        setStartTime(selectedStartTime);
        setStage(3);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/time_slots/appointment/schedule", {
                doctor: doctor,
                startTime,
                durationMinutes: 30,
                description
            });
            navigate('/patient/my-appointments')
        } catch (error) {
            console.error("Error creating appointment:", error);
            alert("Failed to create appointment. Please try again.");
        }
    };

    return (
        <PageWithTopAndSideBar>
            <div className="mx-auto py-10 px-4">
                {stage === 1 && (
                    <Stage1
                        onSelected={handleDoctorSelect}
                    />
                )}

                {stage === 2 && doctor && (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-center">
                                Book Appointment with Dr. {doctor.firstName} {doctor.lastName}
                            </h2>
                            <button
                                className="ml-4 bg-blue-100 text-white px-3 py-1 rounded hover:bg-blue-600"
                                onClick={() => setStage(1)}
                            >
                                Change
                            </button>
                        </div>

                        <Stage2
                            doctor={doctor}
                            onSelected={handleStartTimeSelect}
                        />
                    </>
                )}

                {stage === 3 && (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-center">
                                Book Appointment with Dr. {doctor.firstName} {doctor.lastName}
                            </h2>
                            <button
                                className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                onClick={() => setStage(1)}
                            >
                                Change
                            </button>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-center">
                                Time: {new Date(startTime).toLocaleString("en-GB", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit"
                            })}
                            </h2>
                            <button
                                className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                onClick={() => setStage(2)}
                            >
                                Change
                            </button>
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Description (optional)</label>
                            <textarea
                                className="w-full border px-3 py-2 rounded"
                                rows="3"
                                value={description}
                                placeholder="e.g. My tooth aches..."
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
                            onClick={handleSubmit}
                        >
                            Confirm Appointment
                        </button>
                    </>
                )}
            </div>


        </PageWithTopAndSideBar>
    );
};

export default MakePatientAppointmentPage;

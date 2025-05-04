import React, { useState } from "react";

const AppointmentForm = ({ appointment, onSave, onExit }) => {
    const [isCanceled, setIsCanceled] = useState(appointment?.isCanceled || false);
    const [description, setDescription] = useState(appointment?.description || "");

    return (
        <div className="bg-green-600 text-black p-6 rounded-xl w-full max-w-5xl mx-auto shadow-md space-y-4">
            <h2 className="text-center text-xl font-bold">Appointment</h2>

            <div className="grid grid-cols-2 gap-6">
                {/* Left side */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <label className="font-semibold">Time</label>
                        <div className="bg-blue-600 text-white px-4 py-2 rounded">
                            {appointment.startTime}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="font-semibold">Duration</label>
                        <div className="bg-blue-600 text-white px-4 py-2 rounded">
                            {appointment.durationMinutes} min
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="font-semibold">Is Canceled:</label>
                        <div
                            className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer ${
                                isCanceled ? "bg-red-500" : "bg-gray-300"
                            }`}
                            onClick={() => setIsCanceled(!isCanceled)}
                        >
                            {isCanceled ? "✅" : ""}
                        </div>
                    </div>

                    <div>
                        <a href="#" className="underline text-black font-semibold">
                            Descriere
                        </a>
                        <textarea
                            className="w-full h-40 bg-blue-600 text-white p-2 mt-2 rounded resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                {/* Right side */}
                <div className="space-y-4">
                    <div className="bg-blue-600 text-white p-4 rounded">
                        <p><strong>Name:</strong> {appointment.patient.firstName + " " + appointment.patient.lastName}</p>
                        <p><strong>Email:</strong> {appointment.patient.email}</p>
                        <p><strong>Phone:</strong> {appointment.patient.phone}</p>
                    </div>

                    <div className="bg-blue-600 text-white p-4 rounded">
                        <p><strong>Name:</strong> {appointment.doctor.firstName + " " + appointment.doctor.lastName}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Last edited by:</p>
                        <div className="bg-blue-600 text-white p-4 rounded mt-2">
                            <p><strong>Name:</strong> {appointment.lastEditUser.firstName + " " + appointment.lastEditUser.lastName}</p>
                            <p><strong>Email:</strong> {appointment.lastEditUser.email}</p>
                            <p><strong>Phone:</strong> {appointment.lastEditUser.phone}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-4">
                <button
                    className="bg-red-500 text-white font-semibold px-6 py-2 rounded hover:bg-red-600"
                    onClick={() => onSave({ isCanceled, description })}
                >
                    Save Changes
                </button>
                <button
                    className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600"
                    onClick={onExit}
                >
                    Exit
                </button>
            </div>
        </div>
    );
};

export default AppointmentForm;

import React, { useState } from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import "react-datepicker/dist/react-datepicker.css";
import api from "../axios/api.jsx";
import UserDetailsModal from "./UserDetailsModal.jsx";
import {Roles as ROle, Roles} from "../Roles.jsx";
import SelectUserModal from "./SelectUserModal.jsx";


const AppointmentForm = ({ appointment: initialAppointment, onSave, onExit }) => {
    const [appointment, setAppointment] = useState(initialAppointment);

    const [userToView, setUserToView] = useState({email: null, type: null});

    const [userTypeToSelect, setUserTypeToSelect] = useState(null);



    registerLocale("en-GB", enGB);

    const saveAppointment = async () => {
        try {
            const {data: updatedAppointment} = await api.post("/api/time_slots/appointment/manage/update", {
                ...appointment,
                doctorID: appointment.doctor.id,
                patientID: appointment.patient.id,
            });
            setAppointment(updatedAppointment);
        } catch (error) {
            console.error("Error creating appointment", error);
        }
    }

    const handleChangePatientDoctor = (user) => {
        if (userTypeToSelect === Roles.PATIENT) {
            setAppointment({ ...appointment, patient: user});
        } else if (userTypeToSelect === Roles.DOCTOR) {
            setAppointment({ ...appointment, doctor: user});
        }
        setUserTypeToSelect(null);
    };

    return (
        <div className="bg-white text-black p-6 rounded-xl w-full max-w-4xl shadow-xl space-y-6 relative">

            <button
                onClick={onExit}
                className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl font-bold"
                aria-label="Close modal"
            >
                &times;
            </button>

            <h2 className="text-center text-2xl font-bold text-gray-800">Appointment Details</h2>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="font-medium">Time</label>
                        <DatePicker
                            selected={new Date(appointment.startTime)}
                            onChange={(date) => setAppointment({
                                ...appointment,
                                startTime: date.toLocaleString("sv-SE").replace(" ", "T")
                            })}
                            showTimeSelect
                            dateFormat="PPPPp"
                            locale="en-GB"
                            className="w-auto min-w-[300px] px-4 py-2 bg-blue-100 rounded shadow focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="font-medium">Duration (min)</label>
                        <input value={appointment.durationMinutes}
                               type="number"
                               min="0"
                               placeholder="eg. 120"
                               onChange={(e) => setAppointment({...appointment, durationMinutes: e.target.value})}
                               onBlur={(e) => setAppointment({
                                   ...appointment,
                                   durationMinutes: parseInt(e.target.value) || 0
                               })}
                               className="bg-blue-100 text-black px-3 py-1 rounded"/>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="font-medium">Is Canceled</label>
                        <div
                            className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer ${
                                appointment.isCanceled ? "bg-red-500 text-white" : "bg-yellow-400"
                            }`}
                            onClick={() => setAppointment({...appointment, isCanceled: !appointment.isCanceled})}
                            title="Toggle canceled status"
                        >
                            {appointment.isCanceled ? "Yes" : "No"}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="font-medium">Last Edit Time</label>
                        <p className="bg-blue-400 text-black px-3 py-1 rounded">
                            {new Date(appointment.lastEditTime).toLocaleString("ro-MD")}
                        </p>
                    </div>

                    <div>
                        <label className="font-semibold block mb-1">Description</label>
                        <textarea
                            className="w-full h-65 bg-blue-100 text-black p-2 rounded resize-none"
                            value={appointment.description}
                            onChange={(e) => setAppointment({...appointment, description: e.target.value})}
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    <div>
                        <p className="font-semibold mb-1">Patient:</p>
                        <div
                            className="bg-blue-400 text-black p-4 rounded-lg space-y-1 flex items-center justify-center cursor-pointer">
                            <div className="flex-1 items-center justify-center cursor-pointer">
                                <p><strong>Name:</strong> {appointment.patient.firstName} {appointment.patient.lastName}
                                </p>
                                <p><strong>Email:</strong> {appointment.patient.email}</p>
                                <p><strong>Phone:</strong> {appointment.patient.phone}</p>
                            </div>
                            <div className="flex-1 items-center justify-center cursor-pointer">
                                <button onClick={() => setUserToView({
                                    email: appointment.patient.email,
                                    type: Roles.PATIENT
                                })} className="bg-yellow-500 text-black px-3 py-1 rounded m-1">Details
                                </button>
                                <br/>
                                <button onClick={() => setUserTypeToSelect(Roles.PATIENT)}
                                        className="bg-yellow-500 text-black px-3 py-1 rounded m-1">Change
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold mb-1">Doctor:</p>
                        <div
                            className="bg-blue-400 text-black p-4 rounded-lg flex items-center justify-center cursor-pointer">
                            <div className="flex-1 items-center justify-center cursor-pointer">
                                <p><strong>Name:</strong> {appointment.doctor.firstName} {appointment.doctor.lastName}
                                </p>
                                <p><strong>Email:</strong> {appointment.doctor.email}</p>
                                <p><strong>Phone:</strong> {appointment.doctor.phone}</p>
                            </div>
                            <div className="flex-1 items-center justify-center cursor-pointer">
                                <button
                                    onClick={() => setUserToView({email: appointment.doctor.email, type: Roles.DOCTOR})}
                                    className="bg-yellow-500 text-black px-3 py-1 rounded m-1">Details
                                </button>
                                <br/>
                                <button onClick={() => setUserTypeToSelect(Roles.DOCTOR)}
                                        className="bg-yellow-500 text-black px-3 py-1 rounded m-1">Change
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold mb-1">Last Edited By</p>
                        <div className="bg-blue-400 text-black p-4 rounded-lg space-y-1">
                            <p>
                                <strong>Name:</strong> {appointment.lastEditUser.firstName} {appointment.lastEditUser.lastName}
                            </p>
                            <p><strong>Email:</strong> {appointment.lastEditUser.email}</p>
                            <p><strong>Phone:</strong> {appointment.lastEditUser.phone}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t mt-4">
                <button
                    className="bg-red-500 text-black px-4 py-2 rounded hover:bg-gray-500 font-medium"
                    onClick={() => {
                    }}
                >
                    Cancel Appointment
                </button>
                <button
                    className="bg-green-600 text-black px-5 py-2 rounded hover:bg-green-700 font-semibold"
                    onClick={() => {
                        void saveAppointment();
                        onSave(appointment);
                    }}
                >
                    Save Changes
                </button>
                {/*<button*/}
                {/*    className="bg-red-500 text-black px-4 py-2 rounded hover:bg-gray-500 font-medium"*/}
                {/*    onClick={onExit}*/}
                {/*>*/}
                {/*    Exit*/}
                {/*</button>*/}

            </div>

            {userToView.email && (
                <UserDetailsModal email={userToView.email} onClose={() => setUserToView({email: null, type: null})}
                                  userType={userToView.type}/>
            )}

            {userTypeToSelect && (
                <SelectUserModal roles={[userTypeToSelect]} onSelect={handleChangePatientDoctor}
                                 onClose={() => setUserTypeToSelect(null)}/>
            )}

        </div>
    );
};

export default AppointmentForm;

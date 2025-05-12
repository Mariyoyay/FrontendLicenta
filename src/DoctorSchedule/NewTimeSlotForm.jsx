import DatePicker, {registerLocale} from "react-datepicker";
import {Roles} from "../Roles.jsx";
import store from "../redux/store.jsx";
import UserDetailsModal from "./UserDetailsModal.jsx";
import SelectUserModal from "./SelectUserModal.jsx";
import React, {useState} from "react";
import enGB from "date-fns/locale/en-GB";
import api from "../axios/api.jsx";

function NewTimeSlotForm({ modelTimeSlot,   onSubmit, onExit }) {
    const [timeSlot, setTimeSlot] = useState({...modelTimeSlot, type: "APPOINTMENT"});

    const [userToView, setUserToView] = useState({email: null, type: null});

    const [userTypeToSelect, setUserTypeToSelect] = useState(null);

    registerLocale("en-GB", enGB);

    const createAppointment = async () => {
        try {
            const {data: newAppointment} = await api.post("/api/time_slots/appointment/manage/add", {
                ...timeSlot,
                doctorID: timeSlot.doctor.id,
                patientID: timeSlot.patient.id,
            });
            onSubmit(newAppointment);
        } catch (error) {
            console.error("Error creating timeSlot", error);
        }
    }

    const createOccupiedTimeSlot = async () => {
        try {
            const {data: newOccupiedTimeSlot} = await api.post("/api/time_slots/occupied/add", {
                ...timeSlot,
                doctorID: timeSlot.doctor.id,
            });
            onSubmit(newOccupiedTimeSlot);
        } catch (error) {
            console.error("Error creating timeSlot", error);
        }
    }

    const handleChangePatientDoctor = (user) => {
        if (userTypeToSelect === Roles.PATIENT) {
            setTimeSlot({ ...timeSlot, patient: user});
        } else if (userTypeToSelect === Roles.DOCTOR) {
            setTimeSlot({ ...timeSlot, doctor: user});
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

            <h2 className="text-center text-2xl font-bold text-gray-800">New {timeSlot.type === "APPOINTMENT" ? "Appointment" : "Occupied Time Slot"}</h2>

            {store.getState().auth.username === timeSlot.doctor.email ? (
                <div className="flex items-center justify-between w-full p-2 pb-4 border-b mb-4">
                    <span className="font-medium">Type:</span>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setTimeSlot({...timeSlot, type: "APPOINTMENT"})}
                            className={`px-4 py-1 rounded-full border ${
                                timeSlot.type === "APPOINTMENT"
                                    ? "bg-green-600 text-white"
                                    : "bg-blue-100 text-gray-700"
                            }`}
                        >
                            Appointment
                        </button>
                        <button
                            onClick={() => setTimeSlot({...timeSlot, type: "OCCUPIED"})}
                            className={`px-4 py-1 rounded-full border ${
                                timeSlot.type === "OCCUPIED"
                                    ? "bg-red-600 text-white"
                                    : "bg-blue-100 text-gray-700"
                            }`}
                        >
                            Occupied Time Slot
                        </button>
                    </div>
                </div>
            ) : <></>}

            <div className={`grid md:grid-cols-${timeSlot.type === "APPOINTMENT" ? "2" : "1"} gap-6`}>
                {/* Left Column */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="font-medium">Time</label>
                        <DatePicker
                            selected={new Date(timeSlot.startTime)}
                            onChange={(date) => setTimeSlot({
                                ...timeSlot,
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
                        <input value={timeSlot.durationMinutes || ''}
                               type="number"
                               min="0"
                               placeholder="eg. 120"
                               onChange={(e) => setTimeSlot({...timeSlot, durationMinutes: e.target.value})}
                               className="bg-blue-100 text-black px-3 py-1 rounded"/>
                    </div>

                    <div>
                        <label className="font-semibold block mb-1">Description</label>
                        <textarea
                            className="w-full h-65 bg-blue-100 text-black p-2 rounded resize-none"
                            value={timeSlot.description || ''}
                            placeholder="eg. Control Otro..."
                            onChange={(e) => setTimeSlot({...timeSlot, description: e.target.value})}
                        />
                    </div>
                </div>

                {/* Right Column */}
                {timeSlot.type === "APPOINTMENT" ? (
                    <div className="space-y-4">
                        <div>
                            <p className="font-semibold mb-1">Patient:</p>
                            <div
                                className="bg-blue-400 text-black p-4 rounded-lg space-y-1 flex items-center justify-center cursor-pointer">
                                {timeSlot.patient ? (
                                    <>
                                        <div className="flex-1 items-center justify-center cursor-pointer">
                                            <p><strong>Name:</strong> {timeSlot.patient.firstName} {timeSlot.patient.lastName}
                                            </p>
                                            <p><strong>Email:</strong> {timeSlot.patient.email}</p>
                                            <p><strong>Phone:</strong> {timeSlot.patient.phone}</p>
                                        </div>
                                        <div className="flex-1 items-center justify-center cursor-pointer">
                                            <button onClick={() => setUserToView({
                                                email: timeSlot.patient.email,
                                                type: Roles.PATIENT
                                            })} className="bg-yellow-500 text-black px-3 py-1 rounded m-1">Details
                                            </button>
                                            <br/>
                                            <button onClick={() => setUserTypeToSelect(Roles.PATIENT)}
                                                    className="bg-yellow-500 text-black px-3 py-1 rounded m-1">Change
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <button onClick={() => setUserTypeToSelect(Roles.PATIENT)}
                                            className="bg-yellow-500 text-black px-3 py-1 rounded m-1">Choose Patient
                                    </button>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold mb-1">Doctor:</p>
                            <div
                                className="bg-blue-400 text-black p-4 rounded-lg flex items-center justify-center cursor-pointer">
                                <div className="flex-1 items-center justify-center cursor-pointer">
                                    <p><strong>Name:</strong> {timeSlot.doctor.firstName} {timeSlot.doctor.lastName}
                                    </p>
                                    <p><strong>Email:</strong> {timeSlot.doctor.email}</p>
                                    <p><strong>Phone:</strong> {timeSlot.doctor.phone}</p>
                                </div>
                                <div className="flex-1 items-center justify-center cursor-pointer">
                                    <button
                                        onClick={() => setUserToView({email: timeSlot.doctor.email, type: Roles.DOCTOR})}
                                        className="bg-yellow-500 text-black px-3 py-1 rounded m-1">Details
                                    </button>
                                    <br/>
                                    <button onClick={() => setUserTypeToSelect(Roles.DOCTOR)}
                                            className="bg-yellow-500 text-black px-3 py-1 rounded m-1">Change
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>
                ) : <></>}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t mt-4">
                <button
                    className="bg-green-600 text-black px-4 py-2 rounded hover:bg-gray-500 font-medium"
                    onClick={() => {
                        if (timeSlot.type === "APPOINTMENT") void createAppointment();
                        if (timeSlot.type === "OCCUPIED") void createOccupiedTimeSlot();
                    }}
                >
                    Create {timeSlot.type === "APPOINTMENT" ? "Appointment" : "Occupied Time Slot"}
                </button>
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
}

export default NewTimeSlotForm;
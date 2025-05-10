import React, { useState } from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import "react-datepicker/dist/react-datepicker.css";
import api from "../axios/api.jsx";


const OccupiedTimeSlotForm = ({ occupiedTimeSlot: initialOccupiedTimeSlot, onSave, onExit }) => {
    const [occupiedTimeSlot, setOccupiedTimeSlot] = useState(initialOccupiedTimeSlot);

    registerLocale("en-GB", enGB);

    const saveOccupiedTimeSlot = async () => {
        try {
            const {data: updatedAppointment} = await api.post("/api/time_slots/occupied/update", {
                ...occupiedTimeSlot,
                doctorID: occupiedTimeSlot.doctor.id,
            });
            setOccupiedTimeSlot(updatedAppointment);
        } catch (error) {
            console.error("Error creating appointment", error);
        }
    }

    return (
        <div className="bg-white text-black p-6 rounded-xl w-full max-w-4xl shadow-xl space-y-6 relative">

            <button
                onClick={onExit}
                className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl font-bold"
                aria-label="Close modal"
            >
                &times;
            </button>

            <h2 className="text-center text-2xl font-bold text-gray-800">Occupied Time Slot Details</h2>

            <div className="grid md:grid-cols-1">
                {/* Left Column */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="font-medium">Time</label>
                        <DatePicker
                            selected={new Date(occupiedTimeSlot.startTime)}
                            onChange={(date) => setOccupiedTimeSlot({
                                ...occupiedTimeSlot,
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
                        <input value={occupiedTimeSlot.durationMinutes}
                               type="number"
                               min="0"
                               placeholder="eg. 120"
                               onChange={(e) => setOccupiedTimeSlot({
                                   ...occupiedTimeSlot,
                                   durationMinutes: e.target.value
                               })}
                               onBlur={(e) => setOccupiedTimeSlot({
                                   ...occupiedTimeSlot,
                                   durationMinutes: parseInt(e.target.value) || 0
                               })}
                               className="bg-blue-100 text-black px-3 py-1 rounded"/>
                    </div>

                    <div>
                        <label className="font-semibold block mb-1">Description</label>
                        <textarea
                            className="w-full h-65 bg-blue-100 text-black p-2 rounded resize-none"
                            value={occupiedTimeSlot.description}
                            onChange={(e) => setOccupiedTimeSlot({...occupiedTimeSlot, description: e.target.value})}
                        />
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t mt-4">
                <button
                    className="bg-green-600 text-black px-5 py-2 rounded hover:bg-green-700 font-semibold"
                    onClick={() => {
                        void saveOccupiedTimeSlot();
                        onSave(occupiedTimeSlot);
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
        </div>
    );
};

export default OccupiedTimeSlotForm;

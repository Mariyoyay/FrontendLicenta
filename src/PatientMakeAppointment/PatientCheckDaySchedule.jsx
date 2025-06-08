import React, {useEffect, useState} from "react";
import SelectExactTimeModal from "./SelectExactTimeModal.jsx";
import DoctorUnavailableTimeslotBox from "./DoctorUnavailableTimeSlotBox.jsx";
import api from "../axios/api.jsx";

const hours = Array.from({ length: 13 }, (_, i) => `${8 + i}:00`);

function PatientCheckDaySchedule({ date, day, doctor, onSelected }) {
    const [unavailaleTimeSlots, setUnavailaleTimeSlots] = useState([]);
    const [selectedStartTime, setSelectedStartTime] = useState(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const isoDate = date.toISOString().split("T")[0];
                const { data } = await api.get(`/api/time_slots/appointment/schedule/unavailability/doctor/${doctor.id}`, {
                    params: { date: isoDate },
                });
                setUnavailaleTimeSlots(data);
            } catch (error) {
                console.error("Error fetching day's schedule", error);
            }
        };
        void fetchSchedule();
    }, [date, doctor]);

    const handleTrySelect = (hour) => {
        const isoDate = date.toISOString().split("T")[0];
        const [h, m] = hour.split(":");
        const paddedHour = h.padStart(2, "0");
        const paddedMin = m.padStart(2, "0");
        const isoDateTime = `${isoDate}T${paddedHour}:${paddedMin}:00`;

        setSelectedStartTime(isoDateTime);
    };

    const getDateLabel = (date) =>
        date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });


    return (
        <div className="w-full flex flex-col items-center">
            <h3 className="text-xl font-bold">{day.toUpperCase()}</h3>
            <p className="mb-4">{getDateLabel(date)}</p>

            <div className="relative bg-yellow-100 border-2 border-red-600 rounded-2xl p-4 w-50 h-[785px]">
                {/* Time labels on left */}
                <div className="absolute left-0 top-0 w-full h-full">

                    {hours.map((hour, i) => (
                        <React.Fragment key={i}>
                            {/* Time line + label */}
                            <div className="h-[30px] flex items-center rounded-3xl bg-yellow-100 w-full">
                                <span className="text-sm text-black w-14 pl-2">{hour}</span>
                                <div className="flex-1 border-t-4 border-black rounded mr-2"></div>
                            </div>

                            {/* Blank spacing div */}
                            <div className="h-[30px] bg-yellow-100 w-full rounded-3xl flex items-center px-2">
                                <button
                                    onClick={() => handleTrySelect(hour)}
                                    className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-100text-black text-lg shadow hover:bg-yellow-200"
                                >
                                    +
                                </button>
                            </div>

                        </React.Fragment>
                    ))}
                </div>


                <div className="relative flex-1 top-0 left-12 items-center">
                    {unavailaleTimeSlots.map((timeSlot, i) => {
                        return (
                            <DoctorUnavailableTimeslotBox timeSlot={timeSlot} key={i} />
                        );
                    })}
                </div>
            </div>



            {selectedStartTime && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
                    <SelectExactTimeModal startTime={selectedStartTime} onSubmit={onSelected} onExit={() => setSelectedStartTime(null)}/>
                </div>
            )}
        </div>
    );
}
export default PatientCheckDaySchedule;
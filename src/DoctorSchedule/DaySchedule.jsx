import React, { useEffect, useState } from "react";
import api from "../axios/api";
import AppointmentBox from "./AppointmentBox.jsx";
import AppointmentForm from "./AppointmentForm.jsx";
import OccupiedTimeSlotBox from "./OccupiedTimeSlotBox.jsx";
import OccupiedTimeSlotForm from "./OccupiedTimeSlotForm.jsx";

const hours = Array.from({ length: 13 }, (_, i) => `${8 + i}:00`);

function DaySchedule({ date, day, doctor, onOtherDayEdit}) {
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const isoDate = date.toISOString().split("T")[0];
                const { data } = await api.get(`/api/time_slots/day_schedule/${doctor}`, {
                    params: { date: isoDate },
                });
                setTimeSlots(data);
            } catch (error) {
                console.error("Error fetching day's schedule", error);
            }
        };
        void fetchSchedule();
    }, [date, doctor]);

    const handleSave = (updatedTimeSlot) => {
        const updatedDate = new Date(updatedTimeSlot.startTime).toISOString().split("T")[0];
        if (updatedDate === date.toISOString().split("T")[0]) {
            setTimeSlots((prev) => prev.map((timeSlot) => (timeSlot.type === updatedTimeSlot.type && timeSlot.id === updatedTimeSlot.id) ? updatedTimeSlot : timeSlot));
            setSelectedTimeSlot(null);
        } else {
            setTimeSlots((prev) => prev.filter((timeSlot) => timeSlot.type !== updatedTimeSlot.type || timeSlot.id !== updatedTimeSlot.id));
            setSelectedTimeSlot(null);
            setTimeout(() => {
                onOtherDayEdit?.(new Date(updatedDate));
            }, 10);
        }
    }

    const handleCancel = (canceledAppointmentId) => {
        setTimeSlots((prev) => prev.map((timeSlot) => (timeSlot.type === "APPOINTMENT" && timeSlot.id === canceledAppointmentId) ? {...timeSlot, isCanceled: true} : timeSlot));
        setSelectedTimeSlot(null);
    }

    const handleDelete = (deletedTimeSlot) => {
        setTimeSlots((prev) => prev.filter((timeSlot) => timeSlot.type !== deletedTimeSlot.type || timeSlot.id !== deletedTimeSlot.id));
        setSelectedTimeSlot(null);
    }

    const getDateLabel = (date) =>
        date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold">{day.toUpperCase()}</h3>
            <p className="mb-4">{getDateLabel(date)}</p>

            <div className="relative bg-yellow-100 border-2 border-red-600 rounded-2xl p-4 w-48 h-[815px]">
                {/* Time labels on left */}
                <div className="absolute left-0 top-0 w-full h-full">
                    <div className="h-[30px] bg-yellow-100 w-full rounded-3xl"></div>

                    {hours.map((hour, i) => (
                        <React.Fragment key={i}>
                            {/* Time line + label */}
                            <div className="h-[30px] flex items-center bg-yellow-100 w-full">
                                <span className="text-sm text-black w-14 pl-2">{hour}</span>
                                <div className="flex-1 border-t-4 border-black rounded mr-2"></div>
                            </div>

                            {/* Blank spacing div */}
                            <div className="h-[30px] bg-yellow-100 w-full rounded-3xl"></div>
                        </React.Fragment>
                    ))}
                </div>


                <div className="relative flex-1 top-0 left-12 items-center">
                    {timeSlots.map((timeSlot) => {
                        if (timeSlot.type === "OCCUPIED") {
                            return (
                                <OccupiedTimeSlotBox occupiedTimeSlot={timeSlot} key={timeSlot.id} onClick={() => {
                                    setSelectedTimeSlot(timeSlot);
                                }} />
                            );
                        } else if (timeSlot.type === "APPOINTMENT") {
                            return (
                                <AppointmentBox appointment={timeSlot} key={timeSlot.id} onClick={() => {
                                    setSelectedTimeSlot(timeSlot);
                                }} />
                            );
                        }
                    })}
                </div>
            </div>

            {selectedTimeSlot && selectedTimeSlot.type === "APPOINTMENT" && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
                        <AppointmentForm
                            appointment={selectedTimeSlot}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            onDelete={handleDelete}
                            onExit={() => setSelectedTimeSlot(null)}
                        />
                </div>
            )}

            {selectedTimeSlot && selectedTimeSlot.type === "OCCUPIED" && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
                    <OccupiedTimeSlotForm
                        occupiedTimeSlot={selectedTimeSlot}
                        onSave={handleSave}
                        onDelete={handleDelete}
                        onExit={() => setSelectedTimeSlot(null)}
                    />
                </div>
            )}
        </div>
    );
}

export default DaySchedule;

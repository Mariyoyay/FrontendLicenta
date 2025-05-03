import React, {useEffect, useState} from "react";
import api from "../axios/api.jsx";

const hours = Array.from({ length: 13 }, (_, i) => `${8 + i}:00`);

function DaySchedule({date, day, doctor}) {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchSchedule = async (date, doctor) => {
            try {
                const isoDate = date.toISOString().split("T")[0];
                const {data} = await api.get(`/api/time_slots/day_schedule/${doctor}`, {params: {date: isoDate}});
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching days schedule", error);
            }
        }
        void fetchSchedule(date, doctor);
    }, [date, doctor]);

    const getDateLabel = (date) => {
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };





    return (
        <div key={day} className="day-column">
            <div className="day-header">
                <strong>{day.toUpperCase()}</strong>
                <div>{getDateLabel(date)}</div>
            </div>
            <div className="time-slots">
                {hours.map((hourLabel, hourIndex) => (
                    <div
                        key={hourLabel}
                        className="time-slot"
                        // onClick={() => handleTimeSlotClick(dayIndex, hourIndex + 8)}
                    >
                        {hourLabel}
                    </div>
                ))}
                {appointments.map((appointment) => (
                    <div
                        key={appointment.id}
                        className="appointment-block"
                        style={{
                            width: '100%',
                            top: (appointment.startTime.split("T")[1].split(":")[0] - 8) * 60,
                            height: (appointment.durationMinutes/60) * 60,
                            opacity:"50%",
                        }}
                    >
                        {appointment.description}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DaySchedule;
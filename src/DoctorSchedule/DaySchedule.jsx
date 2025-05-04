import React, {useEffect, useState} from "react";
import api from "../axios/api.jsx";
import AppointmentBox from "./AppointmentBox.jsx";
import {Link} from "react-router-dom";
import AppointmentForm from "./AppointmentForm.jsx";

const hours = Array.from({ length: 13 }, (_, i) => `${8 + i}:00`);

function DaySchedule({date, day, doctor}) {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null); // <-- NEW

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

            <div className="time-slots-container">
                <div className="time-slots-lines">
                    {hours.map((hourLabel) => {
                        const hour = parseInt(hourLabel);
                        const top = (hour - 8) * 60;
                        return (
                            <div
                                key={hourLabel}
                                className="time-line-row"
                                style={{top: `${top}px`}}
                            >
                                <span className="time-label">{hourLabel}</span>
                                <div className="time-line"/>
                            </div>
                        );
                    })}
                </div>

                {appointments.map((appointment) =>
                    <AppointmentBox
                        appointment={appointment}
                        key={appointment.id}
                        onClick={() => setSelectedAppointment(appointment)}
                    />
                )}
            </div>


            {/* Modal overlay for appointment form */}
            {selectedAppointment && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <AppointmentForm
                            appointment={selectedAppointment}
                            onSave={(updated) => {
                                console.log("Save", updated);
                                setSelectedAppointment(null);
                            }}
                            onExit={() => setSelectedAppointment(null)}
                        />
                    </div>
                </div>
            )}


        </div>

    );
}

export default DaySchedule;
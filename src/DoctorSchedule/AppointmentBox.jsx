import React from "react";

function AppointmentBox({appointment, onClick}) {
    const start = new Date(appointment.startTime);
    const durationMinutes = new Date(appointment.durationMinutes);
    const startHour = start.getHours() + start.getMinutes() / 60;
    const top = (startHour - 8) * 60; // assuming 60px per hour
    const height = (durationMinutes/60) * 60;

    console.log(appointment)

    return (
        <div
            key={appointment.id}
            className="appointment-block"
            style={{
                top: `${top}px`,
                height: `${height}px`,
                opacity: "50%"
            }}
            onClick={onClick}
        >
            {appointment.description}
        </div>
    );
}

export default AppointmentBox;
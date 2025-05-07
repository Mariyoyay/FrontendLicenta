import React from "react";

function AppointmentBox({appointment, onClick: handleClick}) {
    let dateTimeStart = new Date(appointment.startTime);
    const startHour = dateTimeStart.getHours() + dateTimeStart.getMinutes()/60;
    const durationMinutes = appointment.durationMinutes;
    const top = (startHour - 8) * 60 + 30;
    const height = (durationMinutes/60) * 60;


    return (
        <div
            key={appointment.id}
            className="absolute w-29 bg-green-600 text-white border-3 border-black rounded px-2 py-1 text-sm flex items-center justify-center"
            style={{
                top: `${top}px`,
                height: `${height}px`,
            }}
            onClick={handleClick}
        >
            {appointment.description}
        </div>
    );
}

export default AppointmentBox;
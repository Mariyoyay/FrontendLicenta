import React from "react";

function AppointmentBox({ appointment, onClick: handleClick}) {
    const dateTimeStart = new Date(appointment.startTime);
    const dateTimeEnd = new Date(dateTimeStart.getTime() + appointment.durationMinutes * 60000);

    // Format time as HH:MM
    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    const startTime = formatTime(dateTimeStart);
    const endTime = formatTime(dateTimeEnd);

    const startHour = dateTimeStart.getHours() + dateTimeStart.getMinutes() / 60;
    const top = (startHour - 8) * 60;
    const height = (appointment.durationMinutes / 60) * 60;

    const color = appointment.doctor.color;


    if (appointment.isCanceled) return (
        <div
            key={appointment.id}
            className="absolute w-31 text-white border-3 border-black rounded px-2 py-1 text-sm"
            style={{
                top: `${top}px`,
                height: `${height}px`,
                backgroundColor: color,
                opacity: '0.5',
            }}
            onClick={() => {
                handleClick();
            }}
        >
            <div className="h-full flex flex-col items-center justify-center text-center overflow-hidden">
                <div className="font-semibold w-full">
                    {`${appointment.patient.firstName} ${appointment.patient.lastName}`}
                </div>
            </div>
        </div>
    );


    return (
        <div
            key={appointment.id}
            className="absolute w-29 z-10 text-white border-3 border-black rounded px-2 py-1 text-sm"
            style={{
                top: `${top}px`,
                height: `${height}px`,
                backgroundColor: color,
            }}
            onClick={() => {
                handleClick();
            }}
        >
        {/* Start time at top left - smaller and italic */}
            <div className="absolute top-0 left-1 text-[0.5rem] italic">
                {startTime}
            </div>

            <div className="h-full flex flex-col items-center justify-center text-center overflow-hidden">
                <div className="font-semibold w-full ">
                    {`${appointment.patient.firstName} ${appointment.patient.lastName}`}
                </div>
                <div className="text-[0.6rem] italic truncate w-full">
                    {appointment.description}
                </div>
            </div>

            {/* End time at bottom left - smaller and italic */}
            <div className="absolute bottom-0 left-1 text-[0.5rem] italic">
                {endTime}
            </div>
        </div>
    );
}

export default AppointmentBox;
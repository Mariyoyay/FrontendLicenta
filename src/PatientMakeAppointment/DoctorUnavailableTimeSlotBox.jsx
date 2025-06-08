import React from "react";

function DoctorUnavailableTimeslotBox({ timeSlot }) {

    const dateTimeStart = new Date(timeSlot.startTime);
    const dateTimeEnd = new Date(dateTimeStart.getTime() + timeSlot.durationMinutes * 60000);

    // Format time as HH:MM
    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    const startTime = formatTime(dateTimeStart);
    const endTime = formatTime(dateTimeEnd);

    const startHour = dateTimeStart.getHours() + dateTimeStart.getMinutes() / 60;
    const top = (startHour - 8) * 60;
    const height = (timeSlot.durationMinutes / 60) * 60;

    return (
        <div
            key={timeSlot.id}
            className={`absolute bg-black text-white rounded px-2 py-1 text-sm`}
            style={{
                top: `${top}px`,
                height: `${height}px`,
                width: '7.75 rem',
                borderColor: '#000000',
                borderWidth: `1`,
            }}
        >
            {/* Start time at top left - smaller and italic */}
            <div className="absolute top-0 left-1 text-[0.5rem] italic">
                {startTime}
            </div>

            {/* Description centered */}
            <div className="h-full flex flex-col items-center justify-center text-center overflow-hidden">
                <div className="font-semibold italic truncate w-full">
                    UNAVAILABLE
                </div>
            </div>

            {/* End time at bottom left - smaller and italic */}
            <div className="absolute bottom-0 left-1 text-[0.5rem] italic">
                {endTime}
            </div>
        </div>
    );
}

export default DoctorUnavailableTimeslotBox;
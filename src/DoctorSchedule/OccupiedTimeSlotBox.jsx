import React from "react";
import store from "../redux/store.jsx";

function OccupiedTimeSlotBox({occupiedTimeSlot, onClick: handleClick}) {
    const dateTimeStart = new Date(occupiedTimeSlot.startTime);
    const dateTimeEnd = new Date(dateTimeStart.getTime() + occupiedTimeSlot.durationMinutes * 60000);

    // Format time as HH:MM
    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const startTime = formatTime(dateTimeStart);
    const endTime = formatTime(dateTimeEnd);

    const startHour = dateTimeStart.getHours() + dateTimeStart.getMinutes() / 60;
    const top = (startHour - 8) * 60 + 30;
    const height = (occupiedTimeSlot.durationMinutes / 60) * 60;

    return (
        <div
            key={occupiedTimeSlot.id}
            className="absolute w-29 bg-red-600 text-white border-3 border-black rounded px-2 py-1 text-sm"
            style={{
                top: `${top}px`,
                height: `${height}px`,
            }}
            onClick={() => {
                if (occupiedTimeSlot.doctor.email === store.getState().auth.username) handleClick();
            }}
        >
            {/* Start time at top left - smaller and italic */}
            <div className="absolute top-0 left-1 text-[0.5rem] italic">
                {startTime}
            </div>

            {/* Description centered */}
            <div className="h-full flex items-center justify-center">
                {occupiedTimeSlot.description}
            </div>

            {/* End time at bottom left - smaller and italic */}
            <div className="absolute bottom-0 left-1 text-[0.5rem] italic">
                {endTime}
            </div>
        </div>
    );
}

export default OccupiedTimeSlotBox;
import React from "react";
import store from "../redux/store.jsx";

function OccupiedTimeSlotBox({occupiedTimeSlot, onClick: handleClick}) {

    const isOTSDoctorViewing = occupiedTimeSlot.doctor.email === store.getState().auth.username;

    const dateTimeStart = new Date(occupiedTimeSlot.startTime);
    const dateTimeEnd = new Date(dateTimeStart.getTime() + occupiedTimeSlot.durationMinutes * 60000);

    // Format time as HH:MM
    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    const startTime = formatTime(dateTimeStart);
    const endTime = formatTime(dateTimeEnd);

    const startHour = dateTimeStart.getHours() + dateTimeStart.getMinutes() / 60;
    const top = (startHour - 8) * 60;
    const height = (occupiedTimeSlot.durationMinutes / 60) * 60;

    return (
        <div
            key={occupiedTimeSlot.id}
            className={`absolute bg-black text-white rounded px-2 py-1 text-sm`}
            style={{
                top: `${top}px`,
                height: `${height}px`,
                width: `${isOTSDoctorViewing ? '7.75' : '7.25'}rem`,
                borderColor: occupiedTimeSlot.doctor.color,
                borderWidth: `${isOTSDoctorViewing ? '0 20px 0 0' : '0 0 0 20px'}`,
                opacity: `${isOTSDoctorViewing ? "1" : "0.4" }`,
                zIndex: `${isOTSDoctorViewing ? "1" : "2" }`
            }}
            onClick={() => {
                if (isOTSDoctorViewing) handleClick();
            }}
        >
            {/* Start time at top left - smaller and italic */}
            <div className="absolute top-0 left-1 text-[0.5rem] italic">
                {startTime}
            </div>

            {/* Description centered */}
            <div className="h-full flex flex-col items-center justify-center text-center overflow-hidden">
                <div className="font-semibold italic truncate w-full">
                    {occupiedTimeSlot.description}
                </div>
            </div>

            {/* End time at bottom left - smaller and italic */}
            <div className="absolute bottom-0 left-1 text-[0.5rem] italic">
                {endTime}
            </div>
        </div>
    );
}

export default OccupiedTimeSlotBox;
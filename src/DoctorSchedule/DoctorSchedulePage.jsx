import React, { useState } from "react";
import DaySchedule from "./DaySchedule";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function getWeekDates(startDate) {
    return Array.from({ length: 5 }, (_, i) => {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        return d;
    });
}

export default function DoctorSchedulePage({ doctor }) {
    const [weekStart, setWeekStart] = useState(new Date("2025-05-05"));

    const [refreshKeys, setRefreshKeys] = useState({});

    const handleRefreshDay = (updatedDate) => {
        const isoUpdatedDate = updatedDate.toISOString().split("T")[0];
        getWeekDates(weekStart).forEach((weekDate, dayIndex) => {
            if (weekDate.toISOString().split('T')[0] === isoUpdatedDate) {
                setRefreshKeys((prev) => ({ ...prev, [dayIndex]: (prev[dayIndex] || 0) + 1 }));
            }
        });
    };

    const handlePrevWeek = () => {
        const prev = new Date(weekStart);
        prev.setDate(weekStart.getDate() - 7);
        setWeekStart(prev);
    };

    const handleNextWeek = () => {
        const next = new Date(weekStart);
        next.setDate(weekStart.getDate() + 7);
        setWeekStart(next);
    };

    const getDateLabel = (date) => {
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const weekDates = getWeekDates(weekStart);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">DOCTOR PROGRAM</h2>
            <div className="flex items-center mb-4">
                <button
                    className="bg-gray-200 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center mr-2"
                    onClick={handlePrevWeek}
                >
                    &lt;
                </button>
                <div className="flex-1 text-center">
                    WEEK: {getDateLabel(weekDates[0])} - {getDateLabel(weekDates[4])}
                </div>
                <button
                    className="bg-gray-200 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center ml-2"
                    onClick={handleNextWeek}
                >
                    &gt;
                </button>
            </div>

            <div className="grid grid-cols-5 gap-4">
                {days.map((day, dayIndex) => (
                    <DaySchedule
                        key={dayIndex + "-refreshValue-" + (refreshKeys[dayIndex] || 0)}
                        date={weekDates[dayIndex]}
                        day={day}
                        doctor={doctor}
                        onOtherDayEdit={handleRefreshDay}
                    />
                ))}
            </div>
        </div>
    );
}

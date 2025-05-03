import React, { useState } from "react";
import "./Schedule.css";
import DaySchedule from "./DaySchedule.jsx";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function getWeekDates(startDate) {
    return Array.from({ length: 5 }, (_, i) => {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        return d;
    });
}

export default function DoctorSchedulePage({doctor}) {


    const [weekStart, setWeekStart] = useState(new Date("2025-05-05"));
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [titleInput, setTitleInput] = useState("");

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

    // const handleTimeSlotClick = (dayIndex, hour) => {
    //     setSelectedSlot({ day: dayIndex, start: hour });
    // };
    //
    // const handleAddAppointment = () => {
    //     if (!titleInput || selectedSlot === null) return;
    //     const newAppt = {
    //         id: Date.now(),
    //         title: titleInput,
    //         day: selectedSlot.day,
    //         start: selectedSlot.start,
    //         end: selectedSlot.start + 1,
    //     };
    //     setAppointments([...appointments, newAppt]);
    //     setTitleInput("");
    //     setSelectedSlot(null);
    // };

    const getDateLabel = (date) => {
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const weekDates = getWeekDates(weekStart);

    return (
        <div className="schedule-container">
            <h2>DOCTOR PROGRAM</h2>
            <div className="week-nav">
                <button onClick={handlePrevWeek}>&lt;</button>
                <div className="week-label">
                    WEEK: {getDateLabel(weekDates[0])} - {getDateLabel(weekDates[4])}
                </div>
                <button onClick={handleNextWeek}>&gt;</button>
            </div>

            <div className="schedule-grid">
                {days.map((day, dayIndex) => (
                    <DaySchedule date={weekDates[dayIndex]} day={day} key={dayIndex} doctor={doctor} />
                ))}
            </div>

            {/*{selectedSlot !== null && (*/}
            {/*    <div className="appointment-form">*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            placeholder="Title"*/}
            {/*            value={titleInput}*/}
            {/*            onChange={(e) => setTitleInput(e.target.value)}*/}
            {/*        />*/}
            {/*        <button onClick={handleAddAppointment}>Add Appointment</button>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}

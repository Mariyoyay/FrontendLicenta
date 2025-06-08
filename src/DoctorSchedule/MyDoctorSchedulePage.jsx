import React, {useEffect, useState} from "react";
import PageWithTopAndSideBar from "../pages/PageWithTopAndSideBar.jsx";
import api from "../axios/api.jsx";
import OfficeSelector from "../OfficeSchedule/OfficeSelector.jsx";
import DayOfficeSchedule from "../OfficeSchedule/DayOfficeSchedule.jsx";
import DayDoctorSchedule from "./DayDoctorSchedule.jsx";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function getWeekDates(startDate) {
    return Array.from({ length: 5 }, (_, i) => {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        return d;
    });
}

function dateToMondayOfWeek(date) {

    const monday = new Date(date)

    let day = monday.getDay();
    day = day === 6 ? day - 7 : day;

    monday.setDate(monday.getDate() - day + 1);

    return monday;
}


function MyselfDoctorSchedulePage() {
    const [doctor, setDoctor] = useState(null);

    const [weekStart, setWeekStart] = useState(dateToMondayOfWeek(new Date()));

    const [refreshKeys, setRefreshKeys] = useState({});

    const [hideCanceled, setHideCanceled] = useState(false);
    const [showOccupied, setShowOccupied] = useState(false);



    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const { data } = await api.get("/api/users/myself/get");
                setDoctor(data);
            } catch (error) {
                console.error("Error fetching current user data", error);
            }
        }

        void fetchCurrentUser();
    }, []);



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


    if (!doctor) return (
        <PageWithTopAndSideBar>
            <div className="p-4">
                <p>LOADING...</p>
            </div>
        </PageWithTopAndSideBar>
    ); else return (
        <PageWithTopAndSideBar>
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">MY PROGRAM</h2>
                <h3 className="text-xl font-bold mb-4">{doctor.firstName} {doctor.lastName} - {doctor.email}</h3>
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

                <div className="flex items-center gap-2 mb-4">
                    <button
                        onClick={() => setHideCanceled((prev) => !prev)}
                        className={`px-4 py-2 rounded-full font-medium transition 
                        ${hideCanceled ? "bg-red-400 text-white" : "bg-green-400 text-gray-700"}
                    `}
                    >
                        {hideCanceled ? "Show Canceled Appointments" : "Hide Canceled Appointments"}
                    </button>
                    <button
                        onClick={() => setShowOccupied((prev) => !prev)}
                        className={`px-4 py-2 rounded-full font-medium transition 
                        ${showOccupied ? "bg-red-400 text-white" : "bg-green-400 text-gray-700"}
                    `}
                    >
                        {showOccupied ? "Hide Occupied Time Slots" : "Show Occupied Time Slots"}
                    </button>
                </div>

                <div className="w-full px-4">
                    <div className="grid grid-cols-5 gap-4">
                        {days.map((day, dayIndex) => (
                            <DayDoctorSchedule
                                key={dayIndex + "-refreshValue-" + (refreshKeys[dayIndex] || 0)}
                                date={weekDates[dayIndex]}
                                day={day}
                                doctor={doctor}
                                onOtherDayNotified={handleRefreshDay}
                                hideCanceled={hideCanceled}
                                showOccupied={showOccupied}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </PageWithTopAndSideBar>
    );
}

export default MyselfDoctorSchedulePage;
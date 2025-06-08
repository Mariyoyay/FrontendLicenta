import React, {useEffect, useState} from "react";
import DayOfficeSchedule from "./DayOfficeSchedule.jsx";
import {useNavigate, useParams} from "react-router-dom";
import api from "../axios/api.jsx";
import PageWithTopAndSideBar from "../pages/PageWithTopAndSideBar.jsx";
import OfficeSelector from "./OfficeSelector.jsx";

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

export default function OfficeSchedulePage() {
    const { id } = useParams();

    const [weekStart, setWeekStart] = useState(dateToMondayOfWeek(new Date()));

    const [refreshKeys, setRefreshKeys] = useState({});

    const [office, setOffice] = useState(null);

    const [enableSelectOffice, setEnableSelectOffice] = useState(false);

    const [hideCanceled, setHideCanceled] = useState(false);
    const [showOccupied, setShowOccupied] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOffice = async () => {
            try {
                const { data } = await api.get(`/api/offices/get/by_id/${id}`);
                setOffice(data);
            } catch (error) {
                console.error("Office could not be fetched: ", error);
            }
        }
        
        void fetchOffice();
    }, [id]);



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

    if (!office) return (
        <PageWithTopAndSideBar>
            <div className="p-4">
                <p>LOADING...</p>
            </div>
        </PageWithTopAndSideBar>
    );
    else return (
        <PageWithTopAndSideBar>
            <div className="p-4">
                <div className="absolute top-2 right-3">
                    {enableSelectOffice && (
                        <div
                            className="absolute right-0 top-[100%] mt-2  bg-white border border-gray-300 rounded shadow z-50">
                            <OfficeSelector onSelect={(selectedOffice) => {
                                navigate(`/office/${selectedOffice.id}`);
                                setEnableSelectOffice(false);
                            }} onClose={() => setEnableSelectOffice(false)}/>
                        </div>
                    )}
                    <button
                        onClick={() => setEnableSelectOffice(prevState => !prevState)}
                        className=" background bg-yellow-100 hover:bg-yellow-400 text-gray-600 hover:text-black text-2xl font-bold"
                        aria-label="Close modal"
                    >
                        Change Office
                    </button>
                </div>


                <h2 className="text-2xl font-bold mb-4">OFFICE PROGRAM</h2>
                <h3 className="text-xl font-bold mb-4">Office {office.id} - {office.name}</h3>
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
                        <DayOfficeSchedule
                            key={dayIndex + "-refreshValue-" + (refreshKeys[dayIndex] || 0)}
                            date={weekDates[dayIndex]}
                            day={day}
                            office={office}
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

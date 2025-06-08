import {useEffect, useState} from "react";
import PageWithTopAndSideBar from "./pages/PageWithTopAndSideBar.jsx";

function MyAppointmentsPage() {
    const [futureAppointments, setFutureAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [showFuture, setShowFuture] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        void fetchFutureAppointments();
    }, []);

    const fetchFutureAppointments = async () => {
        setLoading(true);
        try{
            const { data } = await api.get(`/api/time_slots/appointment/get/future_by_patient_myself`)
            setFutureAppointments([...data].sort((a, b) =>
                new Date(a.startTime) - new Date(b.startTime)
            ));
        } catch (error) {
            console.error("Error fetching future appointments: " + error);
        }
        setLoading(false);
    };

    const fetchPastAppointments = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/api/time_slots/appointment/get/past_by_patient_myself`);
            setPastAppointments([...data].sort((a, b) =>
                new Date(b.startTime) - new Date(a.startTime)
            ));
        } catch (error) {
            console.error("Error fetching future appointments: " + error);
        }
        setLoading(false);
    };

    const handleCancelAppointment = (appointment) => {
        const confirm = window.confirm(`Are you sure you want to cancel your appointment on ${appointment.startTime}?\nYou might have to get in touch with the clinic in order to reschedule it!`)
        if (!confirm) return;

        const cancelAppointment = async () => {
            try {
                const {data: cancelledAppointment} = await api.post(`/api/time_slots/appointment/cancel`, appointment);
                setFutureAppointments(prev => prev.map(fa => fa.id === cancelledAppointment.id ? cancelledAppointment : fa));
            } catch (error) {
                console.error("Error canceling appointments: " + error);
            }
        }

        void cancelAppointment();
    };


    return (
        <PageWithTopAndSideBar>
            <div className="p-6">
                <div className="absolute top-5 left-0 w-full flex justify-between">
                    <button
                        onClick={() => {
                            if (showFuture){
                                setShowFuture(false);
                                void fetchPastAppointments();
                            } else {
                                setShowFuture(true);
                                void fetchFutureAppointments();
                            }
                        }}
                        className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded ml-5"
                    >
                        {showFuture ? "See Past Appointments" : "See Future Appointments"}
                    </button>
                    <button
                        className="bg-green-700 hover:bg-green-500 text-white px-4 py-2 mr-5"
                        onClick={() => navigate('/patient/schedule-appointment')}
                    >
                        Make an Appointment for a Check-up
                    </button>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : (
                    <PatientAppointmentsList
                        appointments={showFuture ? futureAppointments : pastAppointments}
                        title={showFuture ? "Future Appointments" : "Past Appointments"}
                        handleCancel={handleCancelAppointment}
                    />
                )}
            </div>
        </PageWithTopAndSideBar>
    );
}

export default MyAppointmentsPage;

import React from "react";
import api from "./axios/api.jsx";
import {useNavigate} from "react-router-dom";

const PatientAppointmentsList = ({appointments: receivedAppointments, title: receivedTitle, handleCancel}) => {
    const [appointments, setAppointments] = useState([]);
    const [title, setTitle] = useState("Appointments");

    useEffect(() => {
        setAppointments(receivedAppointments);
        setTitle(receivedTitle);
    }, [receivedAppointments, receivedTitle]);


    return (
        <>
            <h2 className="text-2xl font-bold text-gray-800 text-center">{title}</h2>
            <div className="max-w-5xl mx-auto mt-6 space-y-6 ">
                {appointments.length === 0 && (
                    <p className="text-center text-gray-500">No appointments found.</p>
                )}
                {appointments.map((appointment) => (
                    <div
                        key={appointment.id}
                        className={`border-l-4 p-4 rounded-lg shadow-md ${
                            appointment.isCanceled ? "border-red-500 bg-red-50" : "border-blue-500 bg-blue-50"
                        }`}
                    >
                        <div className="flex justify-center items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold text-gray-800">
                                {new Date(appointment.startTime).toLocaleString()}
                            </h3>
                            {appointment.isCanceled && (
                                <span className="text-red-600 font-bold text-sm">CANCELED</span>
                            )}
                        </div>

                        <p className="text-gray-700 mb-1">
                            <strong>Doctor:</strong> {appointment.doctorName}
                        </p>

                        <p className="text-gray-700 mb-1">
                            <strong>Duration:</strong> {appointment.durationMinutes} minutes
                        </p>

                        <p className="text-gray-700 mb-1">
                            <strong>Office:</strong> {appointment.office.name}
                        </p>

                        <p className="text-gray-600 italic">
                            <strong>Description:</strong><br/>
                            {appointment.description || "No description provided"}
                        </p>


                        {!appointment.isCanceled && new Date(appointment.startTime) > new Date() && (<div
                            className="text-blue-600 font-bold text-sm hover:bg-red-500 hover:text-white p-1 rounded-lg align-right"
                            onClick={() => handleCancel(appointment)}
                        >CANCEL</div>)}

                    </div>
                ))
                }
            </div>
        </>
    );
};


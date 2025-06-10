import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from "./AuthenticationPages/Login.jsx";
import Register from "./AuthenticationPages/Register.jsx";
import {Provider} from "react-redux";
import { store } from "./redux/store.jsx";
import ProtectedRoute from "./AuthenticationPages/ProtectedRoute.jsx";
import LogoutButton from "./AuthenticationPages/LogoutButton.jsx";
import MyDetails from "./MyDetails.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import AdminGrantRolesPage from "./AdminGrantRolesPage.jsx";
import OfficeSchedulePage from "./OfficeSchedule/OfficeSchedulePage.jsx";
import {Roles} from "./Roles.jsx";
import AdminManageOfficesPage from "./AdminManageOfficesPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SelectOfficePage from "./OfficeSchedule/SelectOfficePage.jsx";
import MyselfDoctorSchedulePage from "./DoctorSchedule/MyDoctorSchedulePage.jsx";
import MyAppointmentsPage from "./MyAppointmentsPage.jsx";
import ContactWidget from "./pages/ContactWidget.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import EmployeeManageUsersPage from "./EmployeeManageUsersPage.jsx";
import MakePatientAppointmentPage from "./PatientMakeAppointment/MakePatientAppointmentPage.jsx";
import SelectPatientMedicalRecordsPage from "./MedicalRecords/SelectPatientMedicalRecordsPage.jsx";
import MedicalRecordPage from "./MedicalRecords/MedicalRecordPage.jsx";
import BackupPage from "./MedicalRecords/BackupPage.jsx";
import VerifyEmail from "./AuthenticationPages/VerifyEmail.jsx";
import ChangePassword from "./AuthenticationPages/ChangePassword.jsx";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    {/*Authentication Pages*/}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/verify-email" element={<VerifyEmail/>} />
                    <Route path="/logout" element={<ProtectedRoute> <LogoutButton/> </ProtectedRoute>} />
                    <Route path="/change-password" element={<ChangePassword/>} />

                    {/*Home Page*/}
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<HomePage/>} />
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />


                    <Route path="/my-details" element={<ProtectedRoute><MyDetails /> </ProtectedRoute>} />


                    <Route path="/admin/users" element={<ProtectedRoute permissions={[Roles.ADMIN]}> <AdminGrantRolesPage /> </ProtectedRoute>} />
                    <Route path="/admin/offices" element={<ProtectedRoute permissions={[Roles.ADMIN]} > <AdminManageOfficesPage /> </ProtectedRoute>} />
                    <Route path="/admin/backup" element={<ProtectedRoute permissions={[Roles.ADMIN]} > <BackupPage /> </ProtectedRoute>} />

                    <Route path="/employee/users" element={<ProtectedRoute permissions={[Roles.EMPLOYEE, Roles.DOCTOR]}><EmployeeManageUsersPage/></ProtectedRoute> }/>

                    <Route path="/office" element={<ProtectedRoute permissions={[Roles.EMPLOYEE, Roles.DOCTOR]}> <SelectOfficePage /> </ProtectedRoute>} />
                    <Route path="/office/:id" element={<ProtectedRoute permissions={[Roles.EMPLOYEE, Roles.DOCTOR]}> <OfficeSchedulePage /> </ProtectedRoute>} />

                    <Route path="/doctor/my-schedule" element={<ProtectedRoute permissions={[Roles.DOCTOR]}><MyselfDoctorSchedulePage/></ProtectedRoute>} />

                    <Route path="/patient/my-appointments" element={<ProtectedRoute permissions={[Roles.PATIENT]}><MyAppointmentsPage/></ProtectedRoute> } />
                    <Route path="/patient/schedule-appointment" element={<ProtectedRoute permissions={[Roles.PATIENT]}><MakePatientAppointmentPage/></ProtectedRoute>} />

                    <Route path="/medical-records" element={<ProtectedRoute permissions={[Roles.EMPLOYEE, Roles.DOCTOR]}><SelectPatientMedicalRecordsPage/></ProtectedRoute> } />
                    <Route path="/medical-records/:patient_id" element={<ProtectedRoute permissions={[Roles.EMPLOYEE, Roles.DOCTOR]}><MedicalRecordPage/></ProtectedRoute> } />

                    {/*No Page Found*/}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;

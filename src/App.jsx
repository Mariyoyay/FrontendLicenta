import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from "./AuthenticationPages/Login.jsx";
import Register from "./AuthenticationPages/Register.jsx";
import {Provider} from "react-redux";
import { store } from "./redux/store.jsx";
import ProtectedRoute from "./AuthenticationPages/ProtectedRoute.jsx";
import ProtectedTestPage from "./ProtectedTestPage.jsx";
import LogoutButton from "./AuthenticationPages/LogoutButton.jsx";
import MyDetails from "./MyDetails.jsx";
import HomePage from "./HomePage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import AdminGrantRolesPage from "./AdminGrantRolesPage.jsx";
import OfficeSchedulePage from "./DoctorSchedule/OfficeSchedulePage.jsx";

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
              {/*Authentication Pages*/}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<ProtectedRoute element={<LogoutButton />} />} />

              {/*Home Page*/}
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<HomePage />} />

              <Route path="/ptp" element={<ProtectedRoute element={<ProtectedTestPage />}/>} />
              <Route path="/my-details" element={<ProtectedRoute element={<MyDetails />} />} />

              <Route path="/admin" element={<ProtectedRoute permissions={["ROLE_ADMIN"]} element={<AdminGrantRolesPage />} />} />

              <Route path="/office/:id" element={<ProtectedRoute permissions={["ROLE_EMPLOYEE", "ROLE_DOCTOR"]} element={<OfficeSchedulePage />} />} />

              {/*No Page Found*/}
              <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
  );
}

export default App;

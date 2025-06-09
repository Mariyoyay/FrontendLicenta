import PageWithTopAndSideBar from "../pages/PageWithTopAndSideBar.jsx";
import UserSelector from "../OfficeSchedule/UserSelector.jsx";
import {Roles} from "../Roles.jsx";
import {useNavigate} from "react-router-dom";

function SelectPatientMedicalRecordsPage(){
    const navigate = useNavigate();


    const handleSelectPatient = (patient) => {
        navigate(`/medical-records/${patient.id}`);
    }

    return (
        <PageWithTopAndSideBar>
            <UserSelector byRoles={Roles.PATIENT} onSelect={handleSelectPatient} enableAdd={false}/>
        </PageWithTopAndSideBar>
);
}

export default SelectPatientMedicalRecordsPage;
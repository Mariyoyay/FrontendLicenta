import PageWithTopAndSideBar from "../pages/PageWithTopAndSideBar.jsx";
import OfficeSelector from "./OfficeSelector.jsx";
import {useNavigate} from "react-router-dom";

function SelectOfficePage() {

    const navigate = useNavigate();

    return(
        <PageWithTopAndSideBar>
            <div className="max-w-100 min-h-screen mt-20 flex-1 items-center justify-center w-full">
                <OfficeSelector onSelect={(selectedOffice) => navigate(`/office/${selectedOffice.id}`)} />
            </div>
        </PageWithTopAndSideBar>
    );
}
export default SelectOfficePage;
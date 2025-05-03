import LogoutButton from "./AuthenticationPages/LogoutButton.jsx";
import {Link} from "react-router-dom";

function ProtectedTestPage() {
    return (
        <>
            <div>You are currently accessing the Protected Test Page</div>
            <LogoutButton />
            <Link to="/my-details"><button>My Details</button></Link>
            <Link to="/admin"><button>AdminPage</button></Link>
            <Link to="/doctor"><button>DoctorPage</button></Link>
        </>
    );
}

export default ProtectedTestPage;
import store from "../redux/store.jsx";
import {Link} from "react-router-dom";

function ProtectedRoute({children, permissions}) {

    const loggedOutComponent = (
        <>
            <div>You are currently logged out</div>
            <Link to="/login"><button>Go to the Login Page</button></Link>
        </>
    );

    const permissionDeniedComponent = (
        <>
            <div>Permission denied</div>
            <Link to="/home">
                <button>Go to the Home Page</button>
            </Link>
        </>
    )

    const hasPermission = () => {
        if (!permissions) return true;
        for (let permission of permissions) {
            if (store.getState().auth.roles.includes(permission.code))
                return true;
        }
        return false;
    }

    return store.getState().auth.isAuthenticated ? (hasPermission() ? children : permissionDeniedComponent) : loggedOutComponent;
}

export default ProtectedRoute;
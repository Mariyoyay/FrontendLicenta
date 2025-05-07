import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../axios/authService.jsx";

function LogoutButton() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        await dispatch(logout());

        navigate("/login");
    }


    return(
         <button type="submit" onClick={handleLogout}>Log Out</button>
    );
}

export default LogoutButton;
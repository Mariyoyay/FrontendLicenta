import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../axios/authService.jsx";

function LogoutButton({className}) {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        await dispatch(logout());

        navigate("/home");
    }


    return(
         <button className={className} type="submit" onClick={handleLogout}>Log Out</button>
    );
}

export default LogoutButton;
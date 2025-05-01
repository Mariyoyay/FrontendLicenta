import '../Login.css';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../axios/authService.jsx";
import {Link, useNavigate} from "react-router-dom";


function Login() {

    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        await dispatch(login(credentials));

        navigate("/ptp");
    }


    return(
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-box">
                <h2>Please provide your login details below</h2>

                <label htmlFor="email">Email:</label>
                <input onChange={(e) => setCredentials({...credentials, username: e.target.value})} type="email" id="email" placeholder="Email"/>

                <label htmlFor="password">Password:</label>
                <input onChange={(e) => setCredentials({...credentials, password: e.target.value})} type="password" id="password" placeholder="Password"/>

                <button type="submit">Log In</button>

                <label htmlFor="goRegister">Don't have an account yet?</label>
                <Link to="/register"><button id="goRegister">Register</button></Link>
            </form>
        </div>
    );
}

export default Login;
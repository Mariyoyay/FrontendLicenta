import '../Login.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {register} from "../axios/authService.jsx";

function Register() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        dateOfBirth: ""
    });

    const handleRegister = async (e) => {
        e.preventDefault();

        await dispatch(register(userDetails));

        navigate("/login");
    }

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleRegister}>
                <h2>Please provide your registration details below</h2>

                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" placeholder="First Name"
                       onChange={(e) => setUserDetails({...userDetails, firstName: e.target.value})}/>

                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" placeholder="Last Name"
                       onChange={(e) => setUserDetails({...userDetails, lastName: e.target.value})}/>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Email"
                       onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Password"
                       onChange={(e) => setUserDetails({...userDetails, password: e.target.value})}/>

                <PhoneInput
                    country={'ro'}
                    value={userDetails.phone}
                    onChange={phoneNumber => setUserDetails({
                        ...userDetails,
                        phone: phoneNumber.startsWith('+') ? phoneNumber : '+' + phoneNumber
                    })}
                    inputStyle={{
                        width: '100%',
                        backgroundColor: '#1e1e1e', // dark background
                        color: '#ffffff',           // white text
                        border: '1px solid #444',
                    }}
                    buttonStyle={{
                        backgroundColor: '#1e1e1e', // dark flag dropdown
                        border: '1px solid #444',
                    }}
                    containerStyle={{marginBottom: '1rem'}}
                />


                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input type="date" id="dateOfBirth"
                       onChange={(e) => setUserDetails({...userDetails, dateOfBirth: e.target.value})}/>

                <button type="submit">Register</button>

                <label htmlFor="goLogin">Already have an account?</label>
                <Link to="/login">
                    <button id="goLogin">Log In</button>
                </Link>
            </form>
        </div>
    );
}

export default Register;

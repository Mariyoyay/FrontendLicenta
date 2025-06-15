import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../axios/authService.jsx";
import DatePicker, {registerLocale} from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import PageWithTopAndSideBar from "../pages/PageWithTopAndSideBar.jsx";
import PasswordInput from "./PasswordInput.jsx";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [acceptPolicy, setAcceptPolicy] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        dateOfBirth: ""
    });

    registerLocale("en-GB", enGB);

    const handleRegister = async (e) => {

        if (!passwordValid) {
            alert("Password introduced is not valid");
            return;
        }

        e.preventDefault();
        await dispatch(register(userDetails));
        navigate("/login");
    };

    return (
        <PageWithTopAndSideBar>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <form
                    onSubmit={handleRegister}
                    className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-6"
                >
                    <h2 className="text-2xl font-semibold text-gray-800 text-center">
                        Please provide your registration details below
                    </h2>

                    <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder="John"
                            onChange={(e) => setUserDetails({...userDetails, firstName: e.target.value})}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            placeholder="Doe"
                            onChange={(e) => setUserDetails({...userDetails, lastName: e.target.value})}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <PasswordInput
                            onChange={(e) => {
                                setUserDetails({...userDetails, password: e.target.value});
                                setPasswordValid(e.isValid);
                            }}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <PhoneInput
                            country={'ro'}
                            value={userDetails.phone}
                            onChange={phoneNumber =>
                                setUserDetails({
                                    ...userDetails,
                                    phone: phoneNumber.startsWith('+') ? phoneNumber : '+' + phoneNumber
                                })
                            }
                            inputStyle={{
                                width: '100%',
                                height: '42px',
                                paddingLeft: '48px', // makes room for the flag
                                paddingRight: '12px',
                                backgroundColor: 'white',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.375rem',
                                fontSize: '1rem',
                            }}
                            buttonStyle={{
                                border: '1px solid #d1d5db',
                                borderTopLeftRadius: '0.375rem',
                                borderBottomLeftRadius: '0.375rem',
                            }}
                            containerStyle={{marginTop: '0.25rem'}}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                            Date of Birth
                        </label>

                        <div className="customDatePickerWidth">
                            <DatePicker
                                selected={userDetails.dateOfBirth ? new Date(userDetails.dateOfBirth) : null}
                                onChange={(date) =>
                                    setUserDetails({
                                        ...userDetails,
                                        dateOfBirth: date.toLocaleString("sv-SE").replace(" ", "T")
                                    })
                                }
                                placeholderText="dd-mm-yyyy"
                                dateFormat="dd-MM-yyyy"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 my-4">
                        <input
                            type="checkbox"
                            id="acceptPolicy"
                            name="acceptPolicy"
                            checked={acceptPolicy}
                            onChange={(e) => setAcceptPolicy(e.target.checked)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            required
                        />
                        <label htmlFor="acceptPolicy" className="text-sm text-gray-700">
                            I have read and accept the{' '}
                            <a href="/privacy-policy" target="_blank"
                               className="text-blue-600 underline hover:text-blue-800">
                                Privacy Policy
                            </a>
                        </label>
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                    >
                        Register
                    </button>

                    <div className="text-center pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">Already have an account?</p>
                        <Link to="/login">
                            <button
                                type="button"
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Log In
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </PageWithTopAndSideBar>
    );
}

export default Register;

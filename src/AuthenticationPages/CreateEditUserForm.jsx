import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState } from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import api from "../axios/api.jsx";
import {Roles} from "../Roles.jsx";
import store from "../redux/store.jsx";

function CreateEditUserForm({user: initialUser, onSave, onExit}) {
    const [userDetails, setUserDetails] = useState(initialUser  ? initialUser : {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        dateOfBirth: "",
        color:"",
    });

    const isDoctor = initialUser && initialUser.roles && initialUser.roles.includes(Roles.DOCTOR.code);
    const isMyself = initialUser && initialUser.email && initialUser.email === store.getState().auth.username;

    registerLocale("en-GB", enGB);

    const handleSubmit = () => {

        const createUser = async () => {
            try {
                const {data} = await api.post("/api/users/manage/add", userDetails);
                console.log("created user: ", data);
                onSave(data);
            } catch (error) {
                console.error("Error creating user", error);
            }
        }

        const updateUser = async () => {
            try {
                if (isMyself && isDoctor && userDetails.color !== initialUser.color) {
                    console.log("to update user", userDetails);
                    const {data: colorChangedUser} = await api.post("/api/users/doctor/set_color", {color: userDetails.color});
                    console.log("updated user: ", colorChangedUser);
                }
                const url = isMyself ? "/api/users/myself/update" : "/api/users/manage/update";
                const {data} = await api.post(url, userDetails);
                onSave(data);
            } catch (error) {
                console.error("Error updating user", error);
            }
        }

        if (initialUser) void updateUser();
        else void createUser();
    };

    return (
        <div
            className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-6 relative"
        >
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
                Add a new user to the system
            </h2>

            <button
                onClick={onExit}
                className="absolute top-1 right-1 text-gray-600 hover:text-black text-2xl font-bold"
                aria-label="Close modal"
                type="noSubmit"
            >
                &times;
            </button>

            <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                </label>
                <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={userDetails.firstName || ""}
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
                    value={userDetails.lastName || ""}
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
                    value={userDetails.email || ""}
                    onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <PhoneInput
                    country={'ro'}
                    value={userDetails.phone || ""}
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

            {isMyself && isDoctor && (
                <div className="space-y-2">
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                        Color
                    </label>
                    <input
                        id="colorPicker"
                        type="color"
                        value={userDetails.color}
                        onChange={(e) => setUserDetails({...userDetails, color: e.target.value})}
                        className="w-10 h-10 p-0 border rounded"
                    />
                </div>
            )}

            <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                onClick={handleSubmit}
            >
                {initialUser ? "Update user" : "Create User"}
            </button>
        </div>
    );
}

export default CreateEditUserForm;
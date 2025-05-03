import {loginSuccess, logoutSuccess} from "../redux/authSlice.jsx";
import api from "./api.jsx";
import qs from "qs";


export const login = (credential) => async (dispatch) => {
    try {
        const { data } = await api.post("/api/auth/login",
            qs.stringify(credential),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        dispatch(loginSuccess(data));
    } catch (error) {
        console.error("Login failed with error: ", error);
    }
};

export const logout = () => async (dispatch) => {
    try {
        const { data } = await api.post("/api/auth/logout");
        if (data.success) {
            dispatch(logoutSuccess());
        }
    } catch (error) {
        console.error("Logout failed with error: ", error);
    }
};

export const register = (userDetails) => async () => {
    try {
        const {data} = await api.post("/api/auth/register", userDetails);
        console.log(data);
    } catch (error) {
        console.error("Register failed with error: ", error);
    }
}
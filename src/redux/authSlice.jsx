import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from "jwt-decode";

const token = localStorage.getItem('access_token');
const email = localStorage.getItem('email');
// const token = null;

const user = token ? jwtDecode(token) : null;

const initialState = {
    token,
    user,
    username: user?.sub || email || null,
    roles: user?.roles || [],
    isAuthenticated: !!token,
    recognizedAccount: !!token || !!email,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.recognizedAccount = true;
            const currentUser = jwtDecode(action.payload["access_token"]);
            state.token = action.payload["access_token"];
            state.user = currentUser;
            state.username = currentUser?.sub || null;
            state.roles = currentUser?.roles || [];
            state.isAuthenticated = true;
            localStorage.removeItem('email');
            localStorage.setItem('access_token', action.payload["access_token"]);
        },
        loginNotVerified: (state, action) => {
            state.recognizedAccount = true;
            state.isAuthenticated = false;
            state.username = action.payload["email"];
            localStorage.setItem('email', action.payload["email"]);
        },
        logoutSuccess: (state) => {
            state.recognizedAccount = false ;
            state.emailVerified = null;
            state.token = null;
            state.user = null;
            state.username = null;
            state.roles = [];
            state.isAuthenticated = false;
            localStorage.removeItem('access_token');
            localStorage.removeItem('email');
        },
    },
});

export const {loginSuccess, loginNotVerified, logoutSuccess} = authSlice.actions;
export default authSlice.reducer;

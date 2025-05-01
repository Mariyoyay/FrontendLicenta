import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from "jwt-decode";

const token = localStorage.getItem('access_token');
// const token = null;

const user = token ? jwtDecode(token) : null;

const initialState = {
    token,
    user,
    username: user?.sub || null,
    roles: user?.roles || [],
    isAuthenticated: !!token,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const currentUser = jwtDecode(action.payload["access_token"]);
            state.token = action.payload["access_token"];
            state.user = currentUser;
            state.username = currentUser?.sub || null;
            state.roles = currentUser?.roles || [];
            state.isAuthenticated = true;
            localStorage.setItem('access_token', action.payload["access_token"]);
        },
        logoutSuccess: (state) => {
            state.token = null;
            state.user = null;
            state.username = null;
            state.roles = [];
            state.isAuthenticated = false;
            localStorage.removeItem('access_token');
        },
    },
});

export const {loginSuccess, logoutSuccess} = authSlice.actions;
export default authSlice.reducer;

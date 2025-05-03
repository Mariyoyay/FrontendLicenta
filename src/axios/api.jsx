import axios from 'axios'
import store from "../redux/store.jsx";
import {loginSuccess, logoutSuccess} from "../redux/authSlice.jsx";
import {data} from "react-router-dom";

const SERVER_IP_ADDRESS = "localhost";

const api = axios.create({
    baseURL: `http://${SERVER_IP_ADDRESS}:8080`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

let  isRefreshing = false;

let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    })
    isRefreshing = [];
};


api.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use((response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    const { data } = await api.post('/api/auth/refresh');
                    store.dispatch(loginSuccess(data));

                    processQueue(null, data["access_token"]);

                    originalRequest.headers.Authorization = `Bearer ${data["access_token"]}`;

                    return api(originalRequest);
                } catch (refreshError) {
                    store.dispatch(logoutSuccess()); // e suficient sau trebe api?

                    processQueue(refreshError, data["access_token"]);

                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return api(originalRequest);
            })
                .catch((err) => Promise.reject(err));
        }
        return Promise.reject(error);
    }
);

export default api;
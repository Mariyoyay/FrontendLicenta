import axios from 'axios'
import store from "../redux/store.jsx";
import {loginSuccess, logoutSuccess} from "../redux/authSlice.jsx";

const SERVER_IP_ADDRESS = "192.168.0.98";

const api = axios.create({
    baseURL: `http://${SERVER_IP_ADDRESS}:8080`,
    headers: {
        'Content-Type': 'application/json',
    },
});

let  isRefreshing = false;

let refreshSubscribers = [];

const subscribeToRefresh = (callBack) => {
    refreshSubscribers.push(callBack);
};


const onRefreshedCallbackSubscribers = (token) => {
    refreshSubscribers.map((callBack) => callBack(token));
    refreshSubscribers = [];
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
                    const { data } = await axios.post(`http://${SERVER_IP_ADDRESS}:8080/api/auth/refresh`);
                    store.dispatch(loginSuccess(data));
                    isRefreshing = false;
                    onRefreshedCallbackSubscribers(data["access_token"]);
                } catch (error) {
                    store.dispatch(logoutSuccess()); // e suficient sau trebe api?
                    return Promise.reject(error);
                }
            }

            return new Promise((resolve) => {
                subscribeToRefresh((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(axios(originalRequest));
                });
            })
        }
        return Promise.reject(error);
    }
);

export default api;
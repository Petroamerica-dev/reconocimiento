import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/api",
    timeout: 100000,
});

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

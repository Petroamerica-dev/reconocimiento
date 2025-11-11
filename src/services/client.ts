import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = axios.create({
    baseURL: API_URL + "/api",
    timeout: 100000,
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (!refreshToken) {
                isRefreshing = false;
                processQueue(error, null);
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                const response = await axios.post(`${API_URL}/auth/refresh`, {
                    refreshToken
                });

                const { accessToken } = response.data;

                localStorage.setItem("accessToken", accessToken);
                
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                
                processQueue(null, accessToken);
                isRefreshing = false;

                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                isRefreshing = false;
                
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
                window.location.href = '/login';
                
                return Promise.reject(refreshError);
            }
        }

        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);
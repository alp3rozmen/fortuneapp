import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000
});

export const axiosBearerInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    }
});
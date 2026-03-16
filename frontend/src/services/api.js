import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

const API = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Add token to requests
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Auth APIs
export const login = (email, password) => API.post('/auth/login', { email, password });
export const register = (userData) => API.post('/auth/register', userData);
export const getCurrentUser = () => API.get('/auth/me');

// User APIs
export const getUsers = () => API.get('/users');
export const getUser = (id) => API.get(`/users/${id}`);
export const updateProfile = (data) => API.put('/users/profile', data);

// Job APIs
export const getJobs = (params) => API.get('/jobs', { params });
export const getJob = (id) => API.get(`/jobs/${id}`);
export const createJob = (data) => API.post('/jobs', data);
export const applyForJob = (id, data) => API.post(`/jobs/${id}/apply`, data);

// Event APIs
export const getEvents = (params) => API.get('/events', { params });
export const getEvent = (id) => API.get(`/events/${id}`);
export const createEvent = (data) => API.post('/events', data);
export const registerForEvent = (id) => API.post(`/events/${id}/register`);

export default API;

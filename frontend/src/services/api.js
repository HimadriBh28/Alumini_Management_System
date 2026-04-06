import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:10000/api';

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

// Handle response errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            toast.error('Session expired. Please login again.');
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const login = (email, password) => API.post('/auth/login', { email, password });
export const register = (userData) => API.post('/auth/register', userData);
export const getCurrentUser = () => API.get('/auth/me');

// User APIs
export const getUsers = (params) => API.get('/users', { params });
export const getUser = (id) => API.get(`/users/${id}`);
export const updateProfile = (data) => API.put('/users/profile', data);

// Job APIs
export const getJobs = (params) => API.get('/jobs', { params });
export const getJob = (id) => API.get(`/jobs/${id}`);
export const createJob = (data) => API.post('/jobs', data);
export const applyForJob = (id, data) => API.post(`/jobs/${id}/apply`, data);
export const getMyJobs = () => API.get('/jobs/my-jobs');

// Event APIs
export const getEvents = (params) => API.get('/events', { params });
export const getEvent = (id) => API.get(`/events/${id}`);
export const createEvent = (data) => API.post('/events', data);
export const registerForEvent = (id) => API.post(`/events/${id}/register`);
export const cancelEventRegistration = (id) => API.delete(`/events/${id}/cancel`);
export const getMyEvents = () => API.get('/events/my-events');

export default API;

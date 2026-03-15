import axios from 'axios';
import toast from 'react-hot-toast';

const API = axios.create({
    baseURL: 'http://localhost:5002/api',  // Changed to 5002
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Add token to requests if it exists
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('API Request:', config.method.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
API.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.status);
        return response;
    },
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        
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
export const getUsers = () => API.get('/users');
export const getUser = (id) => API.get(`/users/${id}`);
export const updateProfile = (data) => API.put('/users/profile', data);
export const approveUser = (id, isApproved) => API.put(`/users/${id}/approve`, { isApproved });
export const deleteUser = (id) => API.delete(`/users/${id}`);

// Job APIs
export const getJobs = (params) => API.get('/jobs', { params });
export const getJob = (id) => API.get(`/jobs/${id}`);
export const createJob = (data) => API.post('/jobs', data);
export const applyForJob = (id, data) => API.post(`/jobs/${id}/apply`, data);
export const updateApplicationStatus = (jobId, applicationId, status) => 
    API.put(`/jobs/${jobId}/applications/${applicationId}`, { status });

// Event APIs
export const getEvents = (params) => API.get('/events', { params });
export const getEvent = (id) => API.get(`/events/${id}`);
export const createEvent = (data) => API.post('/events', data);
export const registerForEvent = (id) => API.post(`/events/${id}/register`);
export const updateEvent = (id, data) => API.put(`/events/${id}`, data);
export const deleteEvent = (id) => API.delete(`/events/${id}`);

export default API;

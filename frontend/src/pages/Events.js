import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Events = () => {
    const { isAdmin } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await API.get('/events');
            setEvents(response.data.events || []);
        } catch (error) {
            toast.error('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (eventId) => {
        try {
            await API.post(`/events/${eventId}/register`);
            toast.success('Successfully registered for event!');
            fetchEvents();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to register');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 pt-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Events & Networking</h1>
                {isAdmin && (
                    <Link
                        to="/create-event"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        + Create Event
                    </Link>
                )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                            <p className="text-gray-600 mb-4">{event.description}</p>
                            
                            <div className="space-y-2 mb-4">
                                <p className="text-sm text-gray-500">
                                    📅 {new Date(event.startDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500">
                                    📍 {event.location}
                                </p>
                                <p className="text-sm text-gray-500">
                                    👥 {event.registrations?.length || 0} attendees
                                </p>
                            </div>

                            <button
                                onClick={() => handleRegister(event._id)}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                            >
                                Register Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {events.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No upcoming events</p>
                </div>
            )}
        </div>
    );
};

export default Events;

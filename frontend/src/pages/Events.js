import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const Events = () => {
    const [filter, setFilter] = useState('upcoming');

    const events = [
        {
            id: 1,
            title: "Annual Alumni Meet 2024",
            type: "Networking",
            date: "2024-03-15",
            time: "6:00 PM",
            location: "JUIT Campus, Waknaghat",
            attendees: 156,
            image: "https://via.placeholder.com/400x200",
            description: "Join us for the annual alumni meet with networking sessions and dinner."
        },
        {
            id: 2,
            title: "Tech Talk: AI in Industry",
            type: "Webinar",
            date: "2024-02-28",
            time: "3:00 PM",
            location: "Online (Zoom)",
            attendees: 89,
            image: "https://via.placeholder.com/400x200",
            description: "Learn how AI is transforming industries from our alumni experts."
        },
        {
            id: 3,
            title: "Career Guidance Workshop",
            type: "Workshop",
            date: "2024-03-05",
            time: "10:00 AM",
            location: "Virtual Event",
            attendees: 234,
            image: "https://via.placeholder.com/400x200",
            description: "Get career guidance from successful alumni in various fields."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Events & Networking</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Connect, learn, and grow through our alumni events
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-center mb-8">
                <div className="bg-white p-1 rounded-xl shadow-md inline-flex">
                    {['upcoming', 'past', 'all'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-6 py-2 rounded-lg capitalize ${
                                filter === type
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {type} Events
                        </button>
                    ))}
                </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                    <Link
                        key={event.id}
                        to={`/events/${event.id}`}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-[1.02]"
                    >
                        <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                                {event.type}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                            
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-gray-600">
                                    <CalendarIcon className="h-5 w-5 mr-2" />
                                    <span>{event.date} at {event.time}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <MapPinIcon className="h-5 w-5 mr-2" />
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <UserGroupIcon className="h-5 w-5 mr-2" />
                                    <span>{event.attendees} attending</span>
                                </div>
                            </div>

                            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition-all">
                                Register Now
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Events;

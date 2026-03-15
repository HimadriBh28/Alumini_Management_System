import React from 'react';
import { useParams } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';

const EventDetails = () => {
    const { id } = useParams();

    // Mock event data
    const event = {
        id: id,
        title: "Annual Alumni Meet 2024",
        type: "Networking",
        date: "2024-03-15",
        time: "6:00 PM",
        duration: "4 hours",
        location: "JUIT Campus, Waknaghat",
        attendees: 156,
        maxAttendees: 200,
        description: "Join us for the annual alumni meet where we bring together alumni from all batches for an evening of networking, memories, and celebration. This event features guest speakers, networking sessions, and a dinner.",
        agenda: [
            "6:00 PM - Registration & Welcome Drinks",
            "7:00 PM - Keynote Speech by Distinguished Alumni",
            "8:00 PM - Networking Session",
            "9:00 PM - Dinner",
            "10:30 PM - Closing Remarks"
        ],
        speakers: [
            { name: "Dr. Rajesh Kumar", batch: "1995", topic: "Leadership in Tech" },
            { name: "Ms. Priya Singh", batch: "2000", topic: "Entrepreneurship Journey" }
        ]
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
                    <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-sm mb-4">
                        {event.type}
                    </span>
                    <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
                    <p className="text-blue-100">Join us for an evening of networking and celebration</p>
                </div>

                {/* Event Details */}
                <div className="p-8">
                    {/* Quick Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <CalendarIcon className="h-5 w-5 text-gray-600 mb-2" />
                            <p className="text-sm text-gray-600">Date</p>
                            <p className="font-semibold">{event.date}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <ClockIcon className="h-5 w-5 text-gray-600 mb-2" />
                            <p className="text-sm text-gray-600">Time</p>
                            <p className="font-semibold">{event.time}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <MapPinIcon className="h-5 w-5 text-gray-600 mb-2" />
                            <p className="text-sm text-gray-600">Location</p>
                            <p className="font-semibold">{event.location}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <UserGroupIcon className="h-5 w-5 text-gray-600 mb-2" />
                            <p className="text-sm text-gray-600">Attendees</p>
                            <p className="font-semibold">{event.attendees}/{event.maxAttendees}</p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">About the Event</h2>
                        <p className="text-gray-700 leading-relaxed">{event.description}</p>
                    </div>

                    {/* Agenda */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Agenda</h2>
                        <div className="space-y-3">
                            {event.agenda.map((item, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                                    <p className="text-gray-700">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Speakers */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Speakers</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {event.speakers.map((speaker, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                    <p className="font-semibold text-gray-900">{speaker.name}</p>
                                    <p className="text-sm text-gray-600">Batch of {speaker.batch}</p>
                                    <p className="text-sm text-blue-600 mt-1">Topic: {speaker.topic}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Registration */}
                    <div className="border-t pt-6">
                        <div className="bg-blue-50 p-6 rounded-xl">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to join?</h3>
                            <p className="text-gray-600 mb-4">Secure your spot at this event</p>
                            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 font-semibold transition-all transform hover:scale-105">
                                Register for Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;

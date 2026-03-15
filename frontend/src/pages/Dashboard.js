import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon, CalendarIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
    const stats = [
        { label: 'Active Jobs', value: '24', icon: BriefcaseIcon, color: 'bg-blue-500' },
        { label: 'Upcoming Events', value: '8', icon: CalendarIcon, color: 'bg-green-500' },
        { label: 'Alumni Network', value: '1,234', icon: UserGroupIcon, color: 'bg-purple-500' },
        { label: 'Applications', value: '12', icon: ChartBarIcon, color: 'bg-orange-500' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-xl text-gray-600">Welcome back! Here's what's happening.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                        </div>
                        <p className="text-lg text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link 
                        to="/jobs" 
                        className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-center group"
                    >
                        <BriefcaseIcon className="h-12 w-12 mx-auto mb-3 text-gray-400 group-hover:text-blue-600" />
                        <span className="text-lg font-semibold text-gray-700 group-hover:text-blue-600">Browse Jobs</span>
                    </Link>
                    <Link 
                        to="/events" 
                        className="p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-center group"
                    >
                        <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-gray-400 group-hover:text-green-600" />
                        <span className="text-lg font-semibold text-gray-700 group-hover:text-green-600">View Events</span>
                    </Link>
                    <Link 
                        to="/alumni" 
                        className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all text-center group"
                    >
                        <UserGroupIcon className="h-12 w-12 mx-auto mb-3 text-gray-400 group-hover:text-purple-600" />
                        <span className="text-lg font-semibold text-gray-700 group-hover:text-purple-600">Find Alumni</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

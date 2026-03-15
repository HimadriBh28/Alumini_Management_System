import React, { useState } from 'react';
import { UsersIcon, BriefcaseIcon, CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const stats = [
        { label: 'Total Users', value: '1,234', icon: UsersIcon, color: 'bg-blue-500' },
        { label: 'Job Postings', value: '156', icon: BriefcaseIcon, color: 'bg-green-500' },
        { label: 'Events', value: '23', icon: CalendarIcon, color: 'bg-purple-500' },
        { label: 'Applications', value: '456', icon: ChartBarIcon, color: 'bg-orange-500' },
    ];

    const pendingApprovals = [
        { id: 1, name: 'Alice Johnson', type: 'Alumni', date: '2024-01-15' },
        { id: 2, name: 'Bob Smith', type: 'Student', date: '2024-01-14' },
        { id: 3, name: 'Carol Davis', type: 'Alumni', date: '2024-01-13' },
    ];

    const recentActivities = [
        { id: 1, user: 'John Doe', action: 'Posted a new job', time: '2 hours ago' },
        { id: 2, user: 'Jane Smith', action: 'Registered for event', time: '5 hours ago' },
        { id: 3, user: 'Mike Johnson', action: 'Updated profile', time: '1 day ago' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Panel</h1>
                <p className="text-xl text-gray-600">Manage users, jobs, events, and system settings</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                        </div>
                        <p className="text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg mb-8">
                <div className="border-b px-6">
                    <nav className="flex space-x-8">
                        {['overview', 'users', 'jobs', 'events', 'reports'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-2 capitalize font-medium border-b-2 transition-colors ${
                                    activeTab === tab
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Pending Approvals */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Pending Approvals</h2>
                                <div className="space-y-4">
                                    {pendingApprovals.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold">{item.name}</p>
                                                <p className="text-sm text-gray-600">{item.type} • {item.date}</p>
                                            </div>
                                            <div className="space-x-2">
                                                <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                                                    Approve
                                                </button>
                                                <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
                                <div className="space-y-4">
                                    {recentActivities.map((activity) => (
                                        <div key={activity.id} className="flex items-start">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                                            <div>
                                                <p className="font-semibold">{activity.user}</p>
                                                <p className="text-sm text-gray-600">{activity.action}</p>
                                                <p className="text-xs text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div>
                            <p className="text-gray-600">User management interface will appear here</p>
                        </div>
                    )}

                    {activeTab === 'jobs' && (
                        <div>
                            <p className="text-gray-600">Job management interface will appear here</p>
                        </div>
                    )}

                    {activeTab === 'events' && (
                        <div>
                            <p className="text-gray-600">Event management interface will appear here</p>
                        </div>
                    )}

                    {activeTab === 'reports' && (
                        <div>
                            <p className="text-gray-600">Reports and analytics will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;

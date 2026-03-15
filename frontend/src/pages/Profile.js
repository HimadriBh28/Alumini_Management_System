import React, { useState } from 'react';
import { UserCircleIcon, BriefcaseIcon, AcademicCapIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Alumni",
        graduationYear: "2020",
        branch: "Computer Science",
        currentCompany: "Google",
        designation: "Software Engineer",
        location: "Bangalore, India",
        phone: "+91 98765 43210",
        bio: "Passionate software engineer with experience in full-stack development. Love mentoring students and contributing to the alumni community.",
        skills: ["React", "Node.js", "Python", "MongoDB", "AWS"],
        linkedin: "https://linkedin.com/in/johndoe"
    });

    const handleSave = () => {
        setIsEditing(false);
        // Save profile logic here
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-32"></div>
                <div className="px-8 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end -mt-16 mb-4">
                        <div className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                            <UserCircleIcon className="w-24 h-24 text-gray-400" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                            <p className="text-xl text-gray-600">{profile.designation} at {profile.currentCompany}</p>
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Left Column - Personal Info */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Personal Info</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                                <span className="text-gray-700">{profile.email}</span>
                            </div>
                            <div className="flex items-center">
                                <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                                <span className="text-gray-700">{profile.phone}</span>
                            </div>
                            <div className="flex items-center">
                                <MapPinIcon className="h-5 w-5 text-gray-400 mr-3" />
                                <span className="text-gray-700">{profile.location}</span>
                            </div>
                            <div className="flex items-center">
                                <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-3" />
                                <span className="text-gray-700">{profile.branch} ({profile.graduationYear})</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Professional Info */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">About</h2>
                        {isEditing ? (
                            <textarea
                                value={profile.bio}
                                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                                className="w-full p-3 border rounded-lg"
                                rows="4"
                            />
                        ) : (
                            <p className="text-gray-700">{profile.bio}</p>
                        )}
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {profile.skills.map((skill, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {isEditing && (
                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={handleSave}
                                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;

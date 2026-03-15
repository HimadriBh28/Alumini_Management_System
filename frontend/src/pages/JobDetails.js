import React from 'react';
import { useParams } from 'react-router-dom';
import { BriefcaseIcon, MapPinIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';

const JobDetails = () => {
    const { id } = useParams();

    // Mock job data
    const job = {
        title: "Senior Software Engineer",
        company: "Tech Corp",
        location: "Bangalore, India",
        type: "Full-time",
        salary: "₹25,00,000 - ₹35,00,000",
        description: "We are looking for an experienced software engineer to join our team...",
        requirements: [
            "5+ years of experience in full-stack development",
            "Strong knowledge of React and Node.js",
            "Experience with MongoDB",
            "Bachelor's degree in Computer Science"
        ],
        postedBy: "John Doe (Alumni)",
        postedDate: "2024-01-15",
        deadline: "2024-02-15"
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
                    <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                    <p className="text-xl text-blue-100">{job.company}</p>
                </div>

                {/* Job Details */}
                <div className="p-8">
                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <MapPinIcon className="h-5 w-5 text-gray-600 mb-2" />
                            <p className="text-sm text-gray-600">Location</p>
                            <p className="font-semibold">{job.location}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <BriefcaseIcon className="h-5 w-5 text-gray-600 mb-2" />
                            <p className="text-sm text-gray-600">Job Type</p>
                            <p className="font-semibold">{job.type}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <CurrencyDollarIcon className="h-5 w-5 text-gray-600 mb-2" />
                            <p className="text-sm text-gray-600">Salary</p>
                            <p className="font-semibold">{job.salary}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <ClockIcon className="h-5 w-5 text-gray-600 mb-2" />
                            <p className="text-sm text-gray-600">Deadline</p>
                            <p className="font-semibold">{job.deadline}</p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
                        <p className="text-gray-700 leading-relaxed">{job.description}</p>
                    </div>

                    {/* Requirements */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
                        <ul className="list-disc list-inside space-y-2">
                            {job.requirements.map((req, index) => (
                                <li key={index} className="text-gray-700">{req}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Posted By */}
                    <div className="border-t pt-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Posted by</p>
                            <p className="font-semibold">{job.postedBy}</p>
                            <p className="text-sm text-gray-500">Posted on {job.postedDate}</p>
                        </div>
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 font-semibold transition-all transform hover:scale-105">
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;

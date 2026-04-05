import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Jobs = () => {
    const { isAlumni } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await API.get('/jobs');
            setJobs(response.data.jobs || []);
        } catch (error) {
            toast.error('Failed to load jobs');
        } finally {
            setLoading(false);
        }
    };

    const getJobTypeColor = (type) => {
        const colors = {
            'full-time': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'part-time': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            'internship': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            'contract': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
        };
        return colors[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    };

    const filteredJobs = jobs.filter(job => {
        if (filter === 'all') return true;
        return job.jobType === filter;
    });

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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Job Opportunities</h1>
                {isAlumni && (
                    <Link
                        to="/post-job"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        + Post a Job
                    </Link>
                )}
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {['all', 'full-time', 'part-time', 'internship', 'contract'].map(type => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                            filter === type
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                    >
                        {type.replace('-', ' ')}
                    </button>
                ))}
            </div>

            {/* Jobs Grid */}
            <div className="grid gap-6">
                {filteredJobs.map((job) => (
                    <div key={job._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{job.title}</h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">{job.company}</p>
                                <p className="text-gray-500 dark:text-gray-500 mb-2">{job.location}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobTypeColor(job.jobType)}`}>
                                {job.jobType.replace('-', ' ')}
                            </span>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 mt-4 line-clamp-2">{job.description}</p>
                        
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Posted by {job.postedBy?.name || 'Alumni'}
                            </div>
                            <Link
                                to={`/jobs/${job._id}`}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No jobs found</p>
                </div>
            )}
        </div>
    );
};

export default Jobs;

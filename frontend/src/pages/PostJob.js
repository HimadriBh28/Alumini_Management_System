import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';

const PostJob = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        jobType: 'full-time',
        description: '',
        requirements: '',
        salary: '',
        applicationDeadline: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const requirementsArray = formData.requirements.split('\n').filter(r => r.trim());
            const jobData = {
                ...formData,
                requirements: requirementsArray
            };
            
            await API.post('/jobs', jobData);
            toast.success('Job posted successfully!');
            navigate('/jobs');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to post job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 pt-20">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Post a Job / Internship</h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Job Title *</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="e.g., Senior Software Engineer"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Company *</label>
                        <input
                            type="text"
                            name="company"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Company Name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Location *</label>
                        <input
                            type="text"
                            name="location"
                            required
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="City, Country or Remote"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Job Type *</label>
                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="internship">Internship</option>
                            <option value="contract">Contract</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Salary Range</label>
                        <input
                            type="text"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="e.g., ₹10,00,000 - ₹15,00,000 per year"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Application Deadline</label>
                        <input
                            type="date"
                            name="applicationDeadline"
                            value={formData.applicationDeadline}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Job Description *</label>
                        <textarea
                            name="description"
                            required
                            rows="5"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Describe the role, responsibilities, and benefits..."
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Requirements (one per line) *</label>
                        <textarea
                            name="requirements"
                            required
                            rows="4"
                            value={formData.requirements}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Bachelor's degree in Computer Science&#10;3+ years of experience in React&#10;Experience with Node.js"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                            {loading ? 'Posting...' : 'Post Job'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/jobs')}
                            className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJob;

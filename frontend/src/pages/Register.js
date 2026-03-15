import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, EnvelopeIcon, LockClosedIcon, AcademicCapIcon, CalendarIcon } from '@heroicons/react/24/outline';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student',
        graduationYear: '',
        branch: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        setLoading(true);
        
        // Simulate registration
        setTimeout(() => {
            setLoading(false);
            navigate('/dashboard');
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full bg-white p-10 rounded-2xl shadow-xl">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                        Create Account
                    </h2>
                    <p className="text-lg text-gray-600">
                        Join our alumni community today
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-base font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="pl-10 w-full p-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-base font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <EnvelopeIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="pl-10 w-full p-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="col-span-2">
                            <label className="block text-base font-medium text-gray-700 mb-2">
                                I am a
                            </label>
                            <div className="flex space-x-4">
                                <label className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                    formData.role === 'student' 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-gray-200 hover:border-blue-200'
                                }`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={formData.role === 'student'}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <div className="text-center">
                                        <AcademicCapIcon className={`h-8 w-8 mx-auto mb-2 ${
                                            formData.role === 'student' ? 'text-blue-600' : 'text-gray-400'
                                        }`} />
                                        <span className={`font-medium ${
                                            formData.role === 'student' ? 'text-blue-600' : 'text-gray-600'
                                        }`}>Student</span>
                                    </div>
                                </label>
                                
                                <label className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                    formData.role === 'alumni' 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-gray-200 hover:border-blue-200'
                                }`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="alumni"
                                        checked={formData.role === 'alumni'}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <div className="text-center">
                                        <UserIcon className={`h-8 w-8 mx-auto mb-2 ${
                                            formData.role === 'alumni' ? 'text-blue-600' : 'text-gray-400'
                                        }`} />
                                        <span className={`font-medium ${
                                            formData.role === 'alumni' ? 'text-blue-600' : 'text-gray-600'
                                        }`}>Alumni</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Branch */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-base font-medium text-gray-700 mb-2">
                                Branch/Department
                            </label>
                            <input
                                name="branch"
                                type="text"
                                required
                                value={formData.branch}
                                onChange={handleChange}
                                className="w-full p-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                placeholder="Computer Science"
                            />
                        </div>

                        {/* Graduation Year */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-base font-medium text-gray-700 mb-2">
                                Graduation Year
                            </label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    name="graduationYear"
                                    type="number"
                                    required
                                    value={formData.graduationYear}
                                    onChange={handleChange}
                                    className="pl-10 w-full p-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="2024"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-base font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pl-10 w-full p-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-base font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="pl-10 w-full p-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 px-4 text-base font-semibold rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all transform hover:scale-[1.02]"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Account...
                            </span>
                        ) : 'Create Account'}
                    </button>

                    <div className="text-center">
                        <p className="text-base text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-2xl font-bold">
                        Alumni<span className="text-yellow-300">Connect</span>
                    </Link>
                    
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
                                <Link to="/jobs" className="hover:text-gray-200">Jobs</Link>
                                <Link to="/events" className="hover:text-gray-200">Events</Link>
                                <Link to="/alumni" className="hover:text-gray-200">Alumni</Link>
                                <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-gray-200">Login</Link>
                                <Link to="/register" className="bg-yellow-400 text-indigo-800 px-4 py-2 rounded-lg hover:bg-yellow-300">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

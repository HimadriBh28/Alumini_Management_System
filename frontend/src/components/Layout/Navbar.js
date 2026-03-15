import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-2xl font-bold hover:text-gray-200 transition-colors">
                        Alumni<span className="text-yellow-300">Connect</span>
                    </Link>
                    
                    <div className="flex space-x-4">
                        <Link 
                            to="/login" 
                            className="px-4 py-2 text-base font-medium hover:bg-white/10 rounded-lg transition-colors"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/register" 
                            className="px-4 py-2 text-base font-medium bg-yellow-400 text-indigo-800 rounded-lg hover:bg-yellow-300 transition-colors"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

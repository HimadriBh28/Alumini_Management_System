import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8">
                Welcome to Alumni Management System
            </h1>
            <p className="text-xl text-center text-gray-600 mb-12">
                Connect with alumni, find jobs, and stay updated with events
            </p>
            <div className="flex justify-center space-x-4">
                <Link 
                    to="/login" 
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    Login
                </Link>
                <Link 
                    to="/register" 
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Home;

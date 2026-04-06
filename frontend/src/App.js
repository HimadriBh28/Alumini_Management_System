import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import PostJob from './pages/PostJob';
import Events from './pages/Events';
import AlumniDirectory from './pages/AlumniDirectory';
import Profile from './pages/Profile';
import ProtectedRoute from './components/Common/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
              <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
              <Route path="/alumni" element={<ProtectedRoute><AlumniDirectory /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/post-job" element={<ProtectedRoute allowedRoles={['alumni']}><PostJob /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock user data - in real app, this would come from backend
            const userData = {
                id: 1,
                name: email.includes('alumni') ? 'John Alumni' : 'Jane Student',
                email,
                role: email.includes('alumni') ? 'alumni' : 'student',
                avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=4f46e5&color=fff&bold=true`,
                graduationYear: email.includes('alumni') ? '2020' : '2024',
                branch: 'Computer Science',
                company: email.includes('alumni') ? 'Google' : null,
                designation: email.includes('alumni') ? 'Software Engineer' : null
            };
            
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            toast.success('Login successful!');
            return { success: true, user: userData };
        } catch (error) {
            toast.error('Login failed. Please try again.');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const newUser = {
                id: Date.now(),
                name: userData.name,
                email: userData.email,
                role: userData.role,
                avatar: `https://ui-avatars.com/api/?name=${userData.name.replace(' ', '+')}&background=4f46e5&color=fff&bold=true`,
                graduationYear: userData.graduationYear,
                branch: userData.branch,
                company: userData.role === 'alumni' ? '' : null,
                designation: userData.role === 'alumni' ? '' : null
            };
            
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            toast.success('Registration successful!');
            return { success: true };
        } catch (error) {
            toast.error('Registration failed. Please try again.');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        toast.success('Logged out successfully');
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAlumni: user?.role === 'alumni',
        isStudent: user?.role === 'student',
        isAdmin: user?.role === 'admin'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

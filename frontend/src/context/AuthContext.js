import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        // TODO: Implement actual login
        setUser({ name: 'Test User', email, role: 'student' });
        return { success: true };
    };

    const register = async (userData) => {
        // TODO: Implement actual register
        setUser({ name: userData.name, email: userData.email, role: userData.role });
        return { success: true };
    };

    const logout = () => {
        setUser(null);
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
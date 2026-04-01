import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../util/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = async () => {
        try {
            const response = await api.get('/auth/status');
            if (response.data.isAuthenticated) {
                setUser(response.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.log('User not authenticated (this is normal)');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/log-in', { email, password });
            if (response.data.user) {
                setUser(response.data.user);
                return response.data;
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};
// Client/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../util/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [serverError, setServerError] = useState(false);

    const checkAuthStatus = async () => {
        try {
            const response = await api.get('/auth/status');
            if (response.data.isAuthenticated) {
                setUser(response.data.user);
                setServerError(false);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.log('User not authenticated (this is normal)');
            setUser(null);
            
            if (error.code === 'ERR_NETWORK' || error.message.includes('ERR_CONNECTION_REFUSED')) {
                console.error('⚠️ Cannot connect to server. Is the backend running?');
                setServerError(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/log-in', { email, password });
            if (response.data.user) {
                setUser(response.data.user);
                setServerError(false);
                console.log('✅ Login successful:', response.data.user.email);
                return response.data;
            }
        } catch (error) {
            console.error('❌ Login error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            setUser(null);
            console.log('✅ Logout successful');
        } catch (error) {
            console.error('❌ Logout error:', error);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const isAdmin = user?.role === 'super-admin';

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            login, 
            logout, 
            checkAuthStatus,
            serverError,
            isAdmin
        }}>
            {children}
        </AuthContext.Provider>
    );
};
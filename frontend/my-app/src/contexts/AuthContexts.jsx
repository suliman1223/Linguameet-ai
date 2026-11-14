
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: 'http://localhost:3000/api/users',
});

export const AuthProvider = ({ children }) => {
    const [userData, SetUserData] = useState({});
    const router = useNavigate();

    // Register Function
    const handleRegister = async (username, email, password) => {
        try {
            const request = await client.post('/register', {
                username,
                email,
                password,
            });

            if (request.status === 201) {
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    };

    // Login Function

const handleLogin = async (email, password) => {
    try {
        const request = await client.post('/login', {
            email,
            password,
        });

        if (request.status === 200) {
            localStorage.setItem('token', request.data.token);
            router('/dashboard');
            return request.data;
        }
    } catch (err) {
        console.error('Login Error:', err.response?.data || err.message);
        throw err;
    }
};

    // Context Data
    const data = {
        userData,
        SetUserData,
        handleRegister,
        handleLogin,
        router,
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

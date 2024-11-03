import axios from 'axios';
import { useState } from 'react';

const API_URL = 'http://localhost:9000/api/auth';

const logout = () => {
    localStorage.removeItem('token');
};

export const useAuth = () => {
    const [error, setError] = useState();

    const register = async (username, email, password) => {
        try {
            const response = await axios.post(`${API_URL}/register`, { username, email, password });
            return response.data;
        } catch (error_) {
            setError(error_.response.data.message || 'Помилка реєстрації');
            throw error_;
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error_) {
            setError(error_.response.data.message || 'Помилка входу');
            throw error_;
        }
    };

    return { register, login, logout, error };
};

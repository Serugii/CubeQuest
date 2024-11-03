import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import loginImage from '../../assets/images/LoginRegister.png';
import styles from './styles.css';

export default function Login({ toggleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                toggleLogin(true);
                navigate('/profile');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Щось пішло не так!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.imgDiv}>
            <img className={styles.img} src={loginImage} alt="Cubik Rubik" />
            <div className={styles.authorization}>
                <h2 className={styles.loginH2}>Вхід в обліковий запис</h2>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <label htmlFor="email">Адреса електронної пошти</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />

                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    <NavLink to="/register" className={styles.register}>
                        <p>Зареєструватись</p>
                    </NavLink>

                    <button className={styles.loginBtn} type="submit" disabled={loading}>
                        {loading ? 'Завантаження...' : 'Авторизуватися'}
                    </button>
                </form>
            </div>
        </div>
    );
}

Login.propTypes = {
    toggleLogin: PropTypes.func.isRequired,
};

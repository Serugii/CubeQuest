import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { app } from '../../../firebaseConfig';
import loginImage from '../../assets/images/LoginRegister.png';
import styles from './styles.css';

export default function Register({ toggleLogin }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const auth = getAuth(app);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Паролі не співпадають!');
            return;
        }

        setLoading(true);

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            if (response.user) {
                localStorage.setItem('token', response.user.accessToken);
                localStorage.setItem('userId', response.user.uid);
                toggleLogin(true);
                navigate('/profile');
                alert('Користувача успішно зареєстровано!');
            }
        } catch (error) {
            alert(`Помилка: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.imgDiv}>
            <img className={styles.img} src={loginImage} alt="Cubik Rubik" />
            <div className={styles.authorization}>
                <h2 className={styles.registerH2}>Зареєструвати аккаунт</h2>
                <form onSubmit={handleSubmit} className={styles.registerForm}>
                    <label htmlFor="username">Ім&apos;я користувача</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />

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

                    <label htmlFor="confirmPassword">Підтвердьте пароль</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                    />

                    <button className={styles.registerBtn} type="submit" disabled={loading}>
                        {loading ? 'Завантаження...' : 'Зареєструватись'}
                    </button>
                </form>
            </div>
        </div>
    );
}

Register.propTypes = {
    toggleLogin: PropTypes.func.isRequired,
};

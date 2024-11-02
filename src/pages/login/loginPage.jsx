import React from 'react';
import { NavLink } from 'react-router-dom';

import loginImage from '../../assets/images/LoginRegister.png';
import styles from './styles.css';

export default function Login() {
    return (
        <div className={styles.imgDiv}>
            <img className={styles.img} src={loginImage} alt="Cubik Rubik" />
            <div className={styles.authorization}>
                <h2 className={styles.loginH2}>Вхід в обліковий запис</h2>
                <div className={styles.loginForm}>
                    <label htmlFor="username">Ім&aposя користувача</label>
                    <input type="text" id="username" name="username" required />

                    <label htmlFor="password">Пароль</label>
                    <input type="password" id="password" name="password" required />

                    <div className={styles.formCheckbox}>
                        <label>
                            <input type="checkbox" id="remember" name="remember" />
                            Запам&aposятати мене
                        </label>
                        <div>
                            <a href="#">Забули пароль?</a>
                        </div>
                    </div>
                    <NavLink to="/register" className={styles.register}>
                        <p>Зареєструватись</p>
                    </NavLink>

                    <button className={styles.loginBtn} type="submit">
                        Авторизуватися
                    </button>
                </div>
            </div>
        </div>
    );
}

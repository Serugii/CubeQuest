import React from 'react';

import loginImage from '../../assets/images/LoginRegister.png';
import styles from './styles.css';

export default function Register() {
    return (
        <div className={styles.imgDiv}>
            <img className={styles.img} src={loginImage} alt="Cubik Rubik" />
            <div className={styles.authorization}>
                <h2 className={styles.registerH2}>Зареєструвати аккаунт</h2>
                <div className={styles.registerForm}>
                    <label htmlFor="username">Ім&apos;я користувача</label>
                    <input type="text" id="username" name="username" required />

                    <label htmlFor="password">Пароль</label>
                    <input type="password" id="password" name="password" required />

                    <label htmlFor="confirmPassword">Підтвердьте пароль</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required />

                    <label htmlFor="email">Адреса електронної пошти</label>
                    <input type="email" id="email" name="email" required />

                    <p></p>

                    <button className={styles.registerBtn} type="submit">
                        Зареєструватись
                    </button>
                </div>
            </div>
        </div>
    );
}

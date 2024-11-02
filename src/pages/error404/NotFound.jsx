import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './styles.css';

export default function NotFound() {
    return (
        <div className={styles.notFoundContainer}>
            <h1 className={styles.errorCode}>404</h1>
            <h2 className={styles.errorMessage}>Сторінка не знайдена</h2>
            <p className={styles.description}>На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.</p>
            <NavLink to="/" className={styles.homeLink}>
                Повернутися на головну
            </NavLink>
        </div>
    );
}

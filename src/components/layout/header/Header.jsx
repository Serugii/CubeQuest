import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../../assets/images/logo.png';
import styles from './styles.css';

const navLinks = [
    {
        path: '/',
        label: 'Головна',
    },
    {
        path: '/challenges',
        label: 'Челенджі',
    },
    {
        path: '/training',
        label: 'Навчання',
    },
    {
        path: '/about',
        label: 'Про нас',
    },
    {
        path: '/login',
        label: 'Увійти/Реєстрація',
    },
];

export default function Header() {
    // const navigate = useNavigate();
    return (
        <div className={styles.header}>
            <img src={logo} alt="CubeQuest" style={{ maxWidth: '100px', height: 'auto' }} />
            <h1 className={styles.title}>CubeQuest</h1>
            {navLinks.map((link) => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
                >
                    {link.label}
                </NavLink>
            ))}
        </div>
    );
}

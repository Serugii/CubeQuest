import PropTypes from 'prop-types';
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import logo from '../../../assets/images/logo.png';
import styles from './styles.css';

const navLinks = [
    { path: '/', label: 'Головна' },
    { path: '/challenges', label: 'Челенджі' },
    { path: '/training', label: 'Навчання' },
    { path: '/about', label: 'Про нас' },
];

export default function Header({ isLoggedIn }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleAuthClick = () => {
        if (isLoggedIn) {
            navigate('/profile');
        } else {
            navigate('/login');
        }
    };

    const handleChallengesClick = (event) => {
        if (isLoggedIn) {
            event.preventDefault();
            navigate('/play');
        }
    };

    return (
        <div className={styles.header}>
            <img src={logo} alt="CubeQuest" style={{ maxWidth: '100px', height: 'auto' }} />
            <h1 className={styles.title}>CubeQuest</h1>
            {navLinks.map((link) => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                        isActive || (link.path === '/challenges' && location.pathname === '/play')
                            ? `${styles.link} ${styles.active}`
                            : styles.link
                    }
                    onClick={link.path === '/challenges' ? handleChallengesClick : undefined}
                >
                    {link.label}
                </NavLink>
            ))}

            <NavLink
                to={isLoggedIn ? '/profile' : '/login'}
                className={({ isActive }) =>
                    isActive || location.pathname === '/register' || location.pathname === '/login'
                        ? `${styles.link} ${styles.active}`
                        : styles.link
                }
                onClick={handleAuthClick}
            >
                {isLoggedIn ? 'Профіль' : 'Увійти/Зареєструватись'}
            </NavLink>
        </div>
    );
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};

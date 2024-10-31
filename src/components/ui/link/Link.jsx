import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import linkStyles from './styles.css';

const Link = ({ to, children }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => (isActive ? `${linkStyles.link} ${linkStyles.active}` : linkStyles.link)}
        >
            {children}
        </NavLink>
    );
};

Link.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Link;

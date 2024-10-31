import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.css';

export default function Wrapper({ children }) {
    return <div className={styles.mainDiv}>{children}</div>;
}

Wrapper.propTypes = {
    children: PropTypes.node,
};

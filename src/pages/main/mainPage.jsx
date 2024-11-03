import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import introductionCubik from '../../assets/images/MainPage.png';
import RubikCollection from '../../assets/images/RubikCollection.jpg';
import styles from './styles.css';

export default function Main({ isLoggedIn }) {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.infoDiv}>
                <div>
                    <h2>Ласкаво просимо в світ головоломок та пригод! </h2>
                    <p>
                        CubeQuest – це твоя подорож до майстерності у складанні кубиків Рубика. Вивчай, тренуйся та
                        долай квести, щоб стати справжнім майстром.
                    </p>
                    <img className={styles.cubik} src={introductionCubik} alt="Introduction Cubik" />
                    <div className={styles.buttons}>
                        <NavLink
                            to={isLoggedIn ? '/play' : '/login'}
                            className={({ isActive }) => (isActive ? `${styles.a} ${styles.active}` : styles.a)}
                        >
                            <strong>Розпочати</strong>
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) => (isActive ? `${styles.a} ${styles.active}` : styles.a)}
                        >
                            <strong>Дізнатись більше</strong>
                        </NavLink>
                    </div>
                </div>
                <img className={styles.collection} src={RubikCollection} alt="Rubik's Collection" />
            </div>
            <h2>Що таке CubeQuest?</h2>
            <p>
                CubeQuest – це інтерактивна платформа для навчання складання кубиків Рубика та розвитку навичок
                розв&apos;язання головоломок. Тут ти пройдеш шлях від новачка до експерта, вивчаючи схеми складання,
                беручи участь у змаганнях та вирішуючи челенджі. Обери свій рівень і почни подорож прямо зараз!
            </p>
        </div>
    );
}

Main.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};

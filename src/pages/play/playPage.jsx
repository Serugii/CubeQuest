import React, { useRef, useState } from 'react';

import CubicRubik from '../../assets/images/ChallengeCubicRubik.png';
import LeaderBoard from '../../assets/images/LeaderBoard.png';
import styles from './styles.css';

const formatTime = (value) => value.toString().padStart(2, '0');

const ProfilePage = () => {
    const [milliseconds, setMilliseconds] = useState(0);
    const intervalReference = useRef(undefined);

    const startTimer = () => {
        if (intervalReference.current) return;
        const updateTimer = () => {
            setMilliseconds((previousMilliseconds) => previousMilliseconds + 100);
            intervalReference.current = setTimeout(updateTimer, 100);
        };
        updateTimer();
    };

    const stopTimer = () => {
        clearInterval(intervalReference.current);
        intervalReference.current = undefined;
    };

    const resetTimer = () => {
        stopTimer();
        setMilliseconds(0);
    };

    const minutes = Math.floor(milliseconds / 60_000);
    const seconds = Math.floor((milliseconds % 60_000) / 1000);
    const tenthsMilliseconds = Math.floor((milliseconds % 1000) / 100);

    return (
        <div>
            <div className={styles.timerButtons}>
                <button className={styles.button} onClick={startTimer}>
                    Включити таймер
                </button>
                <button className={styles.button} onClick={stopTimer}>
                    Зупинити таймер
                </button>
                <button className={styles.button} onClick={resetTimer}>
                    Скинути
                </button>
                <button className={styles.button}>Перемішати</button>
                <button className={styles.button}>Змінити форму</button>
                <h1 className={styles.timer}>
                    {formatTime(minutes)}:{formatTime(seconds)}:{tenthsMilliseconds}
                </h1>
            </div>
            <div className={styles.images}>
                <img className={styles.cubicRubik} src={CubicRubik} alt="Cubic Rubik 3x3" />
                <img src={LeaderBoard} alt="LeaderBoard" />
            </div>
        </div>
    );
};

export default ProfilePage;

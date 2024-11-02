import React from 'react';
import { NavLink } from 'react-router-dom';

import CubesFight from '../../assets/images/CubesFight.jpg';
import CubeSkater from '../../assets/images/CubeSkater.jpg';
import styles from './styles.css';

export default function Challenge() {
    return (
        <div>
            <div className={styles.titleDiv}>
                <div>
                    <h2>Випробуй свої навички у челенджах!</h2>
                    <p>
                        Ласкаво просимо на сторінку челенджів CubeQuest! Тут ти зможеш випробувати себе у різних
                        викликах з кубиком Рубика та іншими головоломками. Челенджі допоможуть тобі вдосконалити свої
                        навички та позмагатися з іншими користувачами. Наразі доступний тільки один вид змагань –
                        Швидкісне складання кубика Рубика, але скоро з’являться нові виклики! Тож будь напоготові!
                    </p>
                </div>
                <img src={CubesFight} alt="Cubes Fight" className={styles.img} />
            </div>
            <h2 className={styles.secondTitle}>Швидкісне складання кубика на час</h2>
            <p className={styles.paragraf}>
                Чи можеш ти скласти кубик Рубика швидше за всіх? Долучайся до нашого швидкісного челенджу! Твоє завдання
                – скласти кубик якомога швидше. Найкращі результати потраплять у наш глобальний рейтинг.
            </p>
            <div className={styles.titleDiv}>
                <img src={CubeSkater} alt="Cube Skater" className={styles.img} />
                <div>
                    <h2>Як це працює:</h2>
                    <ol>
                        <li className={styles.list}>Запусти таймер і почни складання кубика Рубика.</li>
                        <li className={styles.list}>
                            Завершивши складання, зупини таймер і завантаж свій результат на платформу.
                        </li>
                        <li className={styles.list}>Перевір свої результати у рейтингу та змагайся за першість!</li>
                    </ol>
                    <div className={styles.buttonStart}>
                        <NavLink
                            to="/play"
                            className={({ isActive }) => (isActive ? `${styles.a} ${styles.active}` : styles.a)}
                        >
                            <strong>Почати челендж</strong>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

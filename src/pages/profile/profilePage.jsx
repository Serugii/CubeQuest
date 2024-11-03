import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

import avatar from '../../assets/images/Avatar.jpg';
import edit from '../../assets/images/Edit.jpg';
import rank from '../../assets/images/rank.png';
import styles from './styles.css';

const ProfilePage = ({ onLogout }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ username: '', email: '' });

    useEffect(() => {
        const db = getDatabase();
        const userId = localStorage.getItem('userId');

        if (userId) {
            const userRef = ref(db, 'users/' + userId);
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setUserData({ username: data.username, email: data.email });
                }
            });
        } else {
            console.error('User ID not found in localStorage.');
        }
    }, []);

    const handleLogout = () => {
        onLogout();
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <div className={styles.mainDiv}>
            <div className={styles.userDiv}>
                <img className={styles.userImg} src={avatar} alt="My avatar" />
                <div>
                    <h2 className={styles.userName}>
                        {userData.username || "Ваше ім'я"} <img className={styles.toolImg} src={edit} alt="Edit" />
                    </h2>
                    <img className={styles.toolImg} src={rank} alt="My rank" />
                    <div className={styles.userText}>
                        <p>Реєстрація: січень 2026 р.</p>
                        <div className={styles.subs}>
                            <p>0 підписок</p>
                            <p>0 підписників</p>
                        </div>
                    </div>
                    <div className={styles.divButton}>
                        <button className={styles.button}>Підписатися</button>
                        <button className={styles.button}>Відправити виклик</button>
                        <button className={styles.button}>Повідомлення</button>
                        <button className={styles.button} onClick={handleLogout}>
                            Вийти
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.divFooter}>
                <div className={styles.userInfo}>
                    <div className={styles.borderDiv1}>
                        <img className={styles.editInfo} src={edit} alt="Edit" />
                        <h3>Контакти</h3>
                        <p>Електронна пошта</p>
                        <p className={styles.userContactData}>{userData.email || 'Ваша електронна пошта'}</p>
                        <p>Телефон</p>
                        <p className={styles.userContactData}>Номер вашого телефону</p>
                    </div>
                    <div className={styles.borderDiv2}>
                        <img className={styles.editInfo} src={edit} alt="Edit" />
                        <h3>Інформація</h3>
                        <p>Дата народження</p>
                        <p className={styles.userInfoData}>XX.XX.XXXX</p>
                        <p>Мова</p>
                        <p className={styles.userInfoData}>Англійська ...</p>
                        <p>Країна</p>
                        <p className={styles.userInfoData}>Ваша країна</p>
                    </div>
                    <div className={styles.borderDiv3}>
                        <img className={styles.editInfo} src={edit} alt="Edit" />
                        <h3>Деталі користувача</h3>
                        <p>Останній вхід</p>
                        <p className={styles.userInfoData}>В мережі</p>
                        <p>Загальний час на сайті</p>
                        <p className={styles.userInfoData}>X годин, X хвилин</p>
                        <p>Кількість змагань</p>
                        <p className={styles.userInfoData}>
                            0 <span>(0)</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfilePage.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default ProfilePage;

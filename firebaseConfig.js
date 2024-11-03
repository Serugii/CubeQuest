import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyCFVK48ZxsQg7QoeLQOZE_mt2eyYBtKKp4',
    authDomain: 'cubequest-1a495.firebaseapp.com',
    databaseURL: 'https://cubequest-1a495-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'cubequest-1a495',
    storageBucket: 'cubequest-1a495.firebasestorage.app',
    messagingSenderId: '746444299483',
    appId: '1:746444299483:web:6b95fe7046d6120d7140fe',
    measurementId: 'G-HXEP7X4Z4P',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { app, analytics, database };

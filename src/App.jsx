import './App.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/layout/header/Header';
import Wrapper from './components/layout/wrapper/Wrapper';
import About from './pages/aboutUs/aboutUsPage';
import Challenges from './pages/challenge/challengePage';
import NotFound from './pages/error404/NotFound';
import Training from './pages/learning/learningPage';
import Login from './pages/login/loginPage';
import Home from './pages/main/mainPage';
import Play from './pages/play/playPage';
import ProfilePage from './pages/profile/profilePage';
import Register from './pages/register/registerPage';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));

    const toggleLogin = (status) => {
        setIsLoggedIn(status);
        if (!status) {
            localStorage.removeItem('token');
        }
    };

    return (
        <div data-testid="app">
            <Router>
                <Header isLoggedIn={isLoggedIn} />
                <Wrapper>
                    <Routes>
                        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
                        <Route path="/challenges" element={<Challenges />} />
                        <Route path="/training" element={<Training />} />
                        <Route path="/about" element={<About />} />
                        <Route
                            path="/login"
                            element={isLoggedIn ? <Navigate to="/profile" /> : <Login toggleLogin={toggleLogin} />}
                        />
                        <Route
                            path="/register"
                            element={isLoggedIn ? <Navigate to="/profile" /> : <Register toggleLogin={toggleLogin} />}
                        />
                        <Route path="/profile" element={<ProfilePage onLogout={() => toggleLogin(false)} />} />
                        <Route path="/play" element={<Play />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Wrapper>
            </Router>
        </div>
    );
};

export default App;

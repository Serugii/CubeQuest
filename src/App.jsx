import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/layout/header/Header';
import Wrapper from './components/layout/wrapper/Wrapper';
import About from './pages/aboutUs/aboutUsPage';
import Challenges from './pages/challenge/challengePage';
import NotFound from './pages/error404/NotFound';
import Training from './pages/learning/learningPage';
import Login from './pages/login/loginPage';
import Home from './pages/main/mainPage';
import Play from './pages/play/playPage';
import Register from './pages/register/registerPage';

const App = () => {
    return (
        <div data-testid="app">
            <Router>
                <Header />
                <Wrapper>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/challenges" element={<Challenges />} />
                        <Route path="/training" element={<Training />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/play" element={<Play />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Wrapper>
            </Router>
        </div>
    );
};

export default App;

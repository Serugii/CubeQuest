const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const SECRET_KEY = 'your-secret-key';
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Користувач вже існує' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'Користувача успішно зареєстровано' });
    } catch (error) {
        console.error('Помилка при реєстрації:', error);
        res.status(500).json({ message: 'Невідома помилка, спробуйте ще раз' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Користувача не знайдено' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Невірний пароль' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Помилка при вході:', error);
        res.status(500).json({ message: 'Щось пішло не так, спробуйте ще раз' });
    }
});

module.exports = router;

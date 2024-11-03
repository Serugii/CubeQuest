const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

mongoose
    .connect('mongodb://localhost:27017/mydatabase')
    .then(() => {
        console.log('MongoDB підключено');
    })
    .catch((err) => {
        console.error('Помилка підключення до MongoDB:', err);
    });

app.use(
    cors({
        origin: 'http://localhost:9000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }),
);

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

app.get('/api/test', (req, res) => {
    res.json({ message: 'Сервер працює!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

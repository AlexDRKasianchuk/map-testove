import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = 'secret_key';

const router = Router();

//User store
const users = [];

// Реєстрація користувача
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const userExists = users.find((user) => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'Користувач вже існує' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    const token = jwt.sign({ username: username }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Користувач зареєстрований', token });
});

// Авторизація користувача
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Користувача не знайдено' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Невірний пароль' });
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
});

export default router;

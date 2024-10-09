import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import entityRoutes from './routes/entity.js';
import checkAuthToken from './middleware/middleware.js';
import { CORS_ORIGIN, PORT } from './config.js';

const app = express();

app.use(express.json());

const corsOptions = {
    origin: CORS_ORIGIN,
    methods: 'GET,POST,PUT',
    credentials: true
};
app.use(cors(corsOptions));

//Entity router
app.use('/entity', checkAuthToken, entityRoutes);

//Auth routes
app.use(authRoutes);

// Запуск сервера
const port = PORT;
app.listen(port, () => {
    console.log(`Сервер запущено на http://localhost:${port}`);
});

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from '../module/auth/auth.routers.js';
import userRoutes from '../module/users/user.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('🚀 SAKAY API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;
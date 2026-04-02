import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['https://sakay.online', 'http://localhost:3000', 'http://localhost'],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// MongoDB connection
const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db(process.env.DB_NAME);
console.log(`✅ MongoDB Connected to: ${process.env.DB_NAME}`);

// Make db and ObjectId available to routes
app.use((req, res, next) => {
  req.db = db;
  req.ObjectId = ObjectId;
  next();
});

// Basic routes
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    mongodb: 'connected'
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 SAKAY API is running...',
    endpoints: ['/health', '/api/auth/register', '/api/auth/login', '/api/auth/profile']
  });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

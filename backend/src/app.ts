import express from 'express';
import cors from 'cors';
import transferRoutes from './routes/transferRoutes';
import authRoutes from './routes/authRoutes';
import swaggerRoutes from './routes/swaggerRoutes';

// Express app setup
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerRoutes);
app.use('/api/auth', authRoutes);
app.use(transferRoutes);

export default app;

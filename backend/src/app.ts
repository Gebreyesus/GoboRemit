import express from 'express';
import cors from 'cors';
import transferRoutes from './routes/transferRoutes';

// Express app setup
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(transferRoutes);

export default app;

import express from 'express';
import multer from 'multer';
import { createTransfer } from '../controllers/transferController';

// Express routes for transfer endpoints
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // For now, store locally

router.post('/api/transfers', upload.single('document'), createTransfer);

export default router;

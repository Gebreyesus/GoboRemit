import { Request, Response } from 'express';

// Controller for handling transfer-related requests

// POST /api/transfers
export const createTransfer = async (req: Request, res: Response) => {
  try {
    // Access form fields and file
    const { recipientName, phone, address, bankName, accountNumber, routingNumber } = req.body;
    const document = req.file;
    // TODO: Save to DB, upload file to S3, etc.
    res.status(201).json({ message: 'Transfer request received', data: { recipientName, phone, address, bankName, accountNumber, routingNumber, document: document?.originalname } });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create transfer request' });
  }
};

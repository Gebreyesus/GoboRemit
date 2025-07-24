
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // Return static user data for now
    const user = {
      id: 'static-user-id',
      name,
      email,
      role: role === 'ADMIN' ? 'ADMIN' : 'USER',
    };
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    // Return static user and token for now
    if (email === 'admin@gobo.com' && password === 'adminpass') {
      const user = { id: 'admin-id', name: 'Admin', email, role: 'ADMIN' };
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user });
    }
    if (email === 'user@gobo.com' && password === 'userpass') {
      const user = { id: 'user-id', name: 'User', email, role: 'USER' };
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

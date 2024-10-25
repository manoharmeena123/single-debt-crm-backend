import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const protectRoute = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded; // Attach the decoded user to the request
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

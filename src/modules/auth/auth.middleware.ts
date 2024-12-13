import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../common/utils/jwt.utils';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  let token = req.cookies.token;

  if (!token) {
    const authHeader = req.headers['authorization'];
    token = authHeader && authHeader.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};
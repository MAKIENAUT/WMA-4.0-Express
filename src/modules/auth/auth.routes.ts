import express, { Request, Response, NextFunction } from 'express';
import * as authController from './auth.controller';
import { authenticateToken } from './auth.middleware';

const router = express.Router();

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  authController.register(req, res).catch(next);
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  authController.login(req, res).catch(next);
});

router.post('/logout', authenticateToken, (req: Request, res: Response, next: NextFunction) => {
  authController.logout(req, res).catch(next);
});

router.get('/me', 
  authenticateToken, 
  (req: Request, res: Response, next: NextFunction) => {
    authController.getAuthenticatedUser(req, res).catch(next);
  }
);

export default router;
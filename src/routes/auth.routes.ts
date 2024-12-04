import express, { Request, Response, NextFunction } from 'express';
import * as authController from '../controller/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

// Registration route
router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  authController.register(req, res).catch(next);
});

// Login route
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  authController.login(req, res).catch(next);
});

// Get authenticated user route
router.get('/me', 
  authenticateToken, 
  (req: Request, res: Response, next: NextFunction) => {
    authController.getAuthenticatedUser(req, res).catch(next);
  }
);

export default router;
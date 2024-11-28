import express from 'express';
import { login, protectedRoute } from '../controllers/authController';
import authenticateJWT from '../middlewares/authenticateJWT';

const router = express.Router();

router.post('/login', login);
router.get('/protected', authenticateJWT, protectedRoute);

export default router;

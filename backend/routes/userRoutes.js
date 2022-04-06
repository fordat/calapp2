import express from 'express';
import { createUser, loginUser, getMe } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;
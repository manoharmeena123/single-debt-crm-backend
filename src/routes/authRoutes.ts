import express from 'express';
import { registerUser, loginUser } from '@/controllers/index';

const router = express.Router();

// Define the routes for user registration and login
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;

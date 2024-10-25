import express from 'express';
import authRoutes from './authRoutes';  // Import the authentication routes

const router = express.Router();

// Define and use all the routes
router.use('/auth', authRoutes);  // Routes for authentication (register, login)

export default router;

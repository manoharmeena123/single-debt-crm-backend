import express from 'express';
import authRoutes from './authRoutes';  // Import the authentication routes
import personalDetailRoutes from './personalDetailRoutes';

const router = express.Router();

// Define and use all the routes
router.use('/auth', authRoutes);  // Routes for authentication (register, login)

// Personal Details routes
router.use('/personal-details', personalDetailRoutes);

export default router;

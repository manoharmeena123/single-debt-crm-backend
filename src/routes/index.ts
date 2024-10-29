import express from 'express';
import authRoutes from './authRoutes';  // Import the authentication routes
import roleRoutes from './roleRoutes';
import permissionRoutes from './permissionRoutes';
import creditorRoutes from './creditorRoutes';
const router = express.Router();

// Define and use all the routes
router.use('/auth', authRoutes);  // Routes for authentication (register, login)
router.use('/roles', roleRoutes);
router.use('/permissions', permissionRoutes);
router.use('/creditors', creditorRoutes);

export default router;

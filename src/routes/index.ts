import express from 'express';
import authRoutes from './authRoutes';  // Import the authentication routes
<<<<<<< HEAD
import roleRoutes from './roleRoutes';
import permissionRoutes from './permissionRoutes';
import creditorRoutes from './creditorRoutes';
=======
import personalDetailRoutes from './personalDetailRoutes';

>>>>>>> 22f1b58c85b8ed18a57db15ee7aa64644711c2eb
const router = express.Router();

// Define and use all the routes
router.use('/auth', authRoutes);  // Routes for authentication (register, login)
router.use('/roles', roleRoutes);
router.use('/permissions', permissionRoutes);
router.use('/creditors', creditorRoutes);

// Personal Details routes
router.use('/personal-details', personalDetailRoutes);

export default router;

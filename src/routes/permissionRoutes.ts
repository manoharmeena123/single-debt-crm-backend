// src/routes/permissionRoutes.ts


import { assignPermissions, createPermission, deletePermission, getPermissionById, listPermission, updatePermission } from '@/controllers/permissionController';
import express from 'express';

const router = express.Router();

router.post('/create-permission', createPermission);
router.get('/list-permissions', listPermission);
router.get('/permission/:id', getPermissionById);
router.put('/update-permission/:id', updatePermission);
router.delete('/delete-permission/:id', deletePermission);
router.post('/assign-permissions', assignPermissions);

export default router;

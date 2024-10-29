import { createRole, deleteRole, getRoleById, listRoles, updateRole } from '@/controllers/roleController';
import express from 'express';

const router = express.Router();

router.post('/create-role', createRole);
router.get('/list-roles', listRoles);
router.get('/role/:id', getRoleById);
router.put('/update-role/:id', updateRole);
router.delete('/delete-role/:id', deleteRole);

export default router;
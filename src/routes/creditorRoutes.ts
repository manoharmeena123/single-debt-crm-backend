// src/routes/permissionRoutes.ts

import { createCreditor, deleteCreditor, getCreditorById, listCreditor, updateCreditor } from '@/controllers/creditorController';
import express from 'express';

const router = express.Router();

router.post('/create-creditor', createCreditor);
router.get('/list-creditors', listCreditor);
router.get('/creditor/:id', getCreditorById);
router.put('/update-creditor/:id', updateCreditor);
router.delete('/delete-creditor/:id', deleteCreditor);

export default router;

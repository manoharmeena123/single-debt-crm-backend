// src/controllers/RoleController.ts

import { Request, Response } from 'express';
import Joi from 'joi';
import { Creditors,ICreditors } from '@/models/creditorModel';
import BaseService from '../services/BaseService';
import BaseResponse from '../utils/BaseResponse';
import roleSchema from '@/validation/roleValidator';

const creditorService = new BaseService<ICreditors>(Creditors);

// Joi schemas for validation


export const createCreditor = async(req: Request, res: Response): Promise<void> =>  {
  
  const { error } = roleSchema.validate(req.body);
  
  if (error) {
    res.status(400).json(BaseResponse.error(error.details[0].message, 400));
    return;
  }
  try {
    const creditorExist = await creditorService.exists(req.body);
    if (creditorExist) {
      res.status(400).json(BaseResponse.error('Creditor already exists', 400));
      return;
    }
    const creditor = await creditorService.create(req.body);
    res.status(201).json(BaseResponse.success(creditor, "Creditor created successfully", 201));
  } catch (error) {
    res.status(500).json(BaseResponse.error("Failed to create Creditor"));
  }
}

export const listCreditor = async(req: Request, res: Response): Promise<void> =>  {
  try {
    const creditors = await creditorService.find(req.query);
    res.json(BaseResponse.success(creditors, "Creditor retrieved successfully"));
  } catch (error) {
    res.status(500).json(BaseResponse.error("Failed to retrieve Creditor"));
  }
}

export const getCreditorById = async(req: Request, res: Response): Promise<void> => {
  try {
    const creditor = await creditorService.findById(req.params.id);
    if (!creditor) {
      res.status(404).json(BaseResponse.error("Creditor not found", 404));
      return;
    }
    res.json(BaseResponse.success(creditor, "Creditor retrieved successfully"));
  } catch (error) {
    res.status(500).json(BaseResponse.error("Failed to retrieve Creditor"));
  }
}

export const updateCreditor = async(req: Request, res: Response): Promise<void> => {
  const { error } = roleSchema.validate(req.body);
  if (error) {
    res.status(400).json(BaseResponse.error(error.details[0].message, 400));
    return;
  }

  try {
    const creditor = await creditorService.update(req.params.id, req.body);
    if (!creditor) {
      res.status(404).json(BaseResponse.error("Creditor not found", 404));
      return;
    }
    res.json(BaseResponse.success(creditor, "Creditor updated successfully"));
  } catch (error) {
    res.status(500).json(BaseResponse.error("Failed to update Creditor"));
  }
}

export const deleteCreditor = async(req: Request, res: Response): Promise<void> => {
  try {
    const creditor = await creditorService.delete(req.params.id);
    if (!creditor) {
      res.status(404).json(BaseResponse.error("Creditor not found", 404));
      return;
    }
    res.json(BaseResponse.success(null, "Creditor deleted successfully"));
  } catch (error) {
    res.status(500).json(BaseResponse.error("Failed to delete Creditor"));
  }
}

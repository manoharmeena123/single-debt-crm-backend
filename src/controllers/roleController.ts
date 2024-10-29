// src/controllers/RoleController.ts

import { Request, Response } from 'express';
import Joi from 'joi';
import { Role,IRole } from '@/models/roleModel';
import BaseService from '../services/BaseService';
import BaseResponse from '../utils/BaseResponse';
import roleSchema from '@/validation/roleValidator';

const roleService = new BaseService<IRole>(Role);

// Joi schemas for validation


export const createRole = async(req: Request, res: Response): Promise<void> =>  {
  
  const { error } = roleSchema.validate(req.body);
  
  if (error) {
    res.status(400).json(BaseResponse.error(error.details[0].message, 400));
    return;
  }
  try {
    const roleExist = await roleService.exists(req.body);
    if (roleExist) {
      res.status(400).json(BaseResponse.error('Role already exists', 400));
      return;
    }
    const role = await roleService.create(req.body);
    res.status(201).json(BaseResponse.success(role, "Role created successfully", 201));
  } catch (error) {
    res.status(500).json(BaseResponse.error("Failed to create role"));
  }
}

export const listRoles = async(req: Request, res: Response): Promise<void> =>  {
  try {
    const roles = await roleService.find(req.query);
    res.json(BaseResponse.success(roles, "Roles retrieved successfully"));
  } catch (error) {
    res.status(500).json(BaseResponse.error("Failed to retrieve roles"));
  }
}

export const getRoleById = async(req: Request, res: Response): Promise<void> => {
  try {
    const role = await roleService.findById(req.params.id);
    if (!role) {
      res.status(404).json(BaseResponse.error("Role not found", 404));
      return;
    }
    res.json(BaseResponse.success(role, "Role retrieved successfully"));
  } catch (error) {
    res.status(500).json(BaseResponse.error("Failed to retrieve role"));
  }
}

export const updateRole = async(req: Request, res: Response): Promise<void> => {
  const { error } = roleSchema.validate(req.body);
  if (error) {
    res.status(400).json(BaseResponse.error(error.details[0].message, 400));
    return;
  }

  try {
    const role = await roleService.update(req.params.id, req.body);
    if (!role) {
      res.status(404).json(BaseResponse.error("Role not found", 404));
      return;
    }
    res.json(BaseResponse.success(role, "Role updated successfully"));
  } catch (error) {
    res.status(500).json(BaseResponse.error("Failed to update role"));
  }
}

export const deleteRole = async(req: Request, res: Response): Promise<void> => {
  try {
    const role = await roleService.delete(req.params.id);
    if (!role) {
      res.status(404).json(BaseResponse.error("Role not found", 404));
      return;
    }
    res.json(BaseResponse.success(null, "Role deleted successfully"));
  } catch (error) {
    res.status(500).json(BaseResponse.error("Failed to delete role"));
  }
}

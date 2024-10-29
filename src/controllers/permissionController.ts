import { Request, Response } from 'express';
import Joi from 'joi';
import { Permission,IPermission } from '@/models/permissionModel';
import BaseService from '../services/BaseService';
import BaseResponse from '../utils/BaseResponse';
import permissionSchema from '@/validation/PermissionValidation';
import rolePermisionSchema from '@/validation/RolePermissionValidation';
import { Role } from '@/models/roleModel';

const permissionService = new BaseService<IPermission>(Permission);

// Joi schemas for validation


export const createPermission = async(req: Request, res: Response): Promise<void> => {
  const { error } = permissionSchema.validate(req.body);
  if (error) {
    res.status(400).json(BaseResponse.error(error.details[0].message, 400));
    return;
  }

  try {
    const permissionExists = await permissionService.exists(req.body);
    if (permissionExists) {
      res.status(400).json(BaseResponse.error('Permission already exists', 400));
      return;
    }
    
    const permission = await permissionService.create(req.body);
    res.status(201).json(BaseResponse.success(permission, "Permission created successfully", 201));
  } catch (error) {
    console.log(error);
    res.status(500).json(BaseResponse.error("Failed to create Permission"));
  }
}

export const listPermission = async(req: Request, res: Response): Promise<void> => {
  try {
    const permission = await permissionService.find(req.query);
    res.json(BaseResponse.success(permission, "Permissions retrieved successfully"));
  } catch (error) {
    res.status(500).json(BaseResponse.error("Failed to retrieve Permissions"));
  }
}

export const getPermissionById = async(req: Request, res: Response): Promise<void> => {
  try {
    const permission = await permissionService.findById(req.params.id);
    if (!permission) {
      res.status(404).json(BaseResponse.error("Permission not found", 404));
      return;
    }
    res.json(BaseResponse.success(permission, "Permission retrieved successfully"));
  } catch (error) {
    res.status(500).json(BaseResponse.error("Failed to retrieve Permission"));
  }
}

export const updatePermission = async(req: Request, res: Response): Promise<void> => {
  const { error } = permissionSchema.validate(req.body);
  if (error) {
    res.status(400).json(BaseResponse.error(error.details[0].message, 400));
    return;
  }

  try {
    const permission = await permissionService.update(req.params.id, req.body);
    if (!permission) {
      res.status(404).json(BaseResponse.error("Permission not found", 404));
      return;
    }
    res.json(BaseResponse.success(permission, "Permission updated successfully"));
  } catch (error) {
    res.status(500).json(BaseResponse.error("Failed to update Permission"));
  }
}

export const deletePermission = async(req: Request, res: Response): Promise<void> => {
  try {
    const permission = await permissionService.delete(req.params.id);
    if (!permission) {
      res.status(404).json(BaseResponse.error("Permission not found", 404));
      return;
    }
    res.json(BaseResponse.success(null, "Permission deleted successfully"));
  } catch (error) {
    res.status(500).json(BaseResponse.error("Failed to delete Permission"));
  }
}


export const assignPermissions = async(req: Request , res: Response): Promise<void> => {
  try {
    const { error } = rolePermisionSchema.validate(req.body);
    if (error) {
      res.status(400).json(BaseResponse.error(error.details[0].message, 400));
      return;
    }

    const role = await Role.findById(req.body.role_id);
    if (!role) {
      res.status(404).json(BaseResponse.error("Role not found", 404));
      return;
    }

    role.permissions = req.body.permissions;
    await role.save();
    res.json(BaseResponse.success(role, "Permissions assign successfully"));
  }catch (error) {
    res.status(500).json(BaseResponse.error("Failed to assign Permissions"));
  }
}
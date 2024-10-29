import Joi from 'joi';
import { Types } from 'mongoose';

// Custom Joi extension to validate MongoDB ObjectId
const objectId = Joi.string().custom((value, helpers) => {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'ObjectId Validation');

const rolePermissionSchema = Joi.object({
  role_id: objectId.required().messages({
    'any.required': 'Role ID is required',
    'any.invalid': 'Role ID must be a valid ObjectId',
  }),
  permissions: Joi.array().items(Joi.string()).required().messages({
    'array.base': 'Permissions must be an array of strings',
    'any.required': 'Permissions are required',
  }),
});

export default rolePermissionSchema;

import Joi from 'joi';
import { ROLES } from '@/constant/roles';

export const validateUser = (userData: any) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(255).required(),
    role: Joi.number().valid(ROLES.MANAGER, ROLES.AGENT).required(),  // Role must be 1 or 2
  });

  return schema.validate(userData);
};

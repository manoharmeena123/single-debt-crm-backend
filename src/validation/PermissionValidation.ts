import Joi from 'joi';

const permissionSchema = Joi.object({
    name: Joi.string().min(3).max(50).required()
});

export default permissionSchema;
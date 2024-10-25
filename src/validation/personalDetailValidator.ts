import Joi from 'joi';

export const validateLead = (leadData: any) => {
  const schema = Joi.object({
    lead_id: Joi.string().required(),  // lead_id must be a string and is required
    pancard: Joi.string().required(),  // pancard must be a string and is required
    aadharCard: Joi.string().required(),  // aadharCard must be a string and is required
    dateOfBirth: Joi.date().allow(null),  // dateOfBirth is optional and can be null
    ageOfClient: Joi.number().min(0).required(),  // ageOfClient must be a number and is required
    fatherName: Joi.string().required(),  // fatherName must be a string and is required
    motherName: Joi.string().required(),  // motherName must be a string and is required
    wifeName: Joi.string().required(),  // wifeName must be a string and is required
    reasonForFinancialDifficulty: Joi.string().required(),  // reasonForFinancialDifficulty must be a string and is required
    numberOfChildren: Joi.number().min(0).required(),  // numberOfChildren must be a number and is required
  });

  return schema.validate(leadData);
};

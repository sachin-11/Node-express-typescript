import Joi from 'joi';

export const itemSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});
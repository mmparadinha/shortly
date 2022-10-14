import Joi from "joi";

export const userSignUpSchema = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref('password'),
});

export const userSignInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
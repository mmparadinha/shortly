import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref('password'),
});

export default userSchema;
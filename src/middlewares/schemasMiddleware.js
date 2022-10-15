import { userSignUpSchema, userSignInSchema } from "../schemas/userSchema.js";
import { urlSchema } from "../schemas/urlSchema.js";

export const userSignUpMiddleware = async (req, res, next) => {
  const user = req.body;
  const validation = userSignUpSchema.validate(user);

  if (validation.error) {
    return res.status(422).send(validation.error.details[0].message);
  }

  next();
};

export const userSignInMiddleware = async (req, res, next) => {
  const user = req.body;
  const validation = userSignInSchema.validate(user);

  if (validation.error) {
    return res.status(422).send(validation.error.details[0].message);
  }

  next();
};

export const urlMiddleware = async (req, res, next) => {
  const url = req.body;
  const validation = urlSchema.validate(url);

  if (validation.error) {
    return res.status(422).send(validation.error.details[0].message);
  }

  next();
};
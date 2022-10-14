import { urlSchema } from "../schemas/urlSchema.js";

export const urlMiddleware = async (req, res, next) => {
  const url = req.body;
  const validation = urlSchema.validate(url);

  if (validation.error) {
    return res.status(422).send(validation.error.details[0].message);
  }

  next();
};
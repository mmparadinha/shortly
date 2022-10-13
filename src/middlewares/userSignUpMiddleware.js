import userSchema from "../schemas/userSchema.js";

const userSignUpMiddleware = async (req, res, next) => {
  const user = req.body;
  const validation = userSchema.validate(user);

  if (validation.error) {
    return res.status(422).send(validation.error.details[0].message);
  }

  next();
};

export default userSignUpMiddleware;
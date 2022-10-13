import express from "express";
import { signupUser } from "../controllers/usersController.js";
import userSignUpMiddleware from "../middlewares/userSignUpMiddleware.js";

const usersRouter = express.Router();

usersRouter.post("/signup", userSignUpMiddleware, signupUser);

export default usersRouter;
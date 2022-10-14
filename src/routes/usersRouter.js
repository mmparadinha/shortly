import express from "express";
import { signUpUser, signInUser } from "../controllers/usersController.js";
import { userSignUpMiddleware, userSignInMiddleware } from "../middlewares/userMiddleware.js";

const usersRouter = express.Router();

usersRouter.post("/signup", userSignUpMiddleware, signUpUser);
usersRouter.post("/signin", userSignInMiddleware, signInUser);


export default usersRouter;
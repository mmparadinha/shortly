import express from "express";
import { shortenUrl } from "../controllers/urlsController.js";
import { urlMiddleware } from "../middlewares/urlMiddleware.js";

const urlsRouter = express.Router();

urlsRouter.post("/url/shorten", urlMiddleware, shortenUrl);

export default urlsRouter;
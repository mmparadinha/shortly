import express from "express";
import { shortenUrl, listSingleUrl, redirectUrl } from "../controllers/urlsController.js";
import { urlMiddleware } from "../middlewares/urlMiddleware.js";

const urlsRouter = express.Router();

urlsRouter.post("/url/shorten", urlMiddleware, shortenUrl);
urlsRouter.get("/urls/:id", listSingleUrl);
urlsRouter.get("/urls/open/:shortUrl", redirectUrl);

export default urlsRouter;
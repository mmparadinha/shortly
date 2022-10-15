import express from "express";
import { shortenUrl, listSingleUrl, redirectUrl, deleteUrl, getRankings } from "../controllers/urlsController.js";
import { urlMiddleware } from "../middlewares/schemasMiddleware.js";

const urlsRouter = express.Router();

urlsRouter.post("/urls/shorten", urlMiddleware, shortenUrl);
urlsRouter.get("/urls/:id", listSingleUrl);
urlsRouter.get("/urls/open/:shortUrl", redirectUrl);
urlsRouter.delete("/urls/:id", deleteUrl);
urlsRouter.get("/ranking", getRankings);

export default urlsRouter;
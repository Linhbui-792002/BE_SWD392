import express from "express";
import cors from "cors";

import { login } from "../controller/auth.js";
const authRouter = express.Router();

authRouter.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

authRouter.post("/", login);

export default authRouter;

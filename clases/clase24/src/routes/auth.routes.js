import { Router } from "express";
import { login, logout } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get("/login", login);
authRouter.get("/logout", logout);
//authRouter.post("/register", register);

export default authRouter;

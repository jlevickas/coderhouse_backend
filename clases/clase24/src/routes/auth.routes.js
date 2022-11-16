import { Router } from "express";
import { login, loginForm, logout } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get("/login", loginForm);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
//authRouter.post("/register", register);

export default authRouter;

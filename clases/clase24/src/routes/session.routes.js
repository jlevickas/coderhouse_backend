import { Router } from "express";
import {
  login,
  loginForm,
  loggedUser,
  logout,
} from "../controllers/session.controller.js";

const authRouter = Router();

authRouter.get("/login", loginForm);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/logged-user", loggedUser);

export default authRouter;

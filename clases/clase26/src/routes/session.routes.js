import { Router } from "express";
import {
  login,
  loginForm,
  loggedUser,
  logout,
  register,
  registerForm,
} from "../controllers/session.controller.js";

const sessionRouter = Router();

sessionRouter.get("/login", loginForm);
sessionRouter.get("/logout", logout);
sessionRouter.get("/logged-user", loggedUser);
sessionRouter.get("/register", registerForm);
sessionRouter.post("/login", login);
sessionRouter.post("/register", register);

export default sessionRouter;

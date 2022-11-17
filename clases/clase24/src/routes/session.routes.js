import { Router } from "express";
import {
  login,
  loginForm,
  loggedUser,
  logout,
} from "../controllers/session.controller.js";

const sessionRouter = Router();

sessionRouter.get("/login", loginForm);
sessionRouter.post("/login", login);
sessionRouter.get("/logout", logout);
sessionRouter.get("/logged-user", loggedUser);

export default sessionRouter;

import { Router } from "express";
import {
  login,
  loginForm,
  loggedUser,
  logout,
  signup,
} from "../controllers/session.controller.js";

const sessionRouter = Router();

sessionRouter.get("/login", loginForm);
sessionRouter.get("/logout", logout);
sessionRouter.get("/logged-user", loggedUser);
sessionRouter.post("/login", login);
sessionRouter.post("/signup", signup);

export default sessionRouter;

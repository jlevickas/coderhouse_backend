import mongoContenedor from "../db/mongoContenedor.js";
import User from "../models/User.js";

const userApi = new mongoContenedor("users");

const login = async (req, res) => {
  const email = await req.body.email;

  req.session.email = email;
  await req.session.save();

  return res.redirect("/");
};

const loginForm = async (req, res) => {
  return res.render("login");
};

const loggedUser = async (req, res) => {
  return res.send(req.session.email);
};

const logout = async (req, res) => {
  const email = await req.session.email;
  await req.session.destroy();

  await res.render("logout-screen", { email });
};

const registerForm = async (req, res) => {
  return res.render("register");
};

const register = async (req, res) => {
  const email = await req.body.email;
  const password = await req.body.password;

  const user = new User({ email, password });
  await userApi.add(user);

  return res.redirect("/login");
};

export { login, loginForm, loggedUser, logout, register, registerForm };

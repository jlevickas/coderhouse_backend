const login = async (req, res) => {
  const username = await req.body.username;

  req.session.username = username;
  await req.session.save();

  return res.redirect("/");
};

const loginForm = async (req, res) => {
  return res.render("login");
};

const loggedUser = async (req, res) => {
  return res.send(req.session.username);
};

const logout = async (req, res) => {
  const username = await req.session.username;
  await req.session.destroy();

  await res.render("logout-screen", { username });
};

const signup = async (req, res) => {
  const email = await req.body.email;
  const password = await req.body.password;
};

export { login, loginForm, loggedUser, logout, signup };

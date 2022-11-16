const login = async (req, res) => {
  const username = await req.body.username;

  req.session.username = username;
  await req.session.save();

  return res.redirect("/");
};

const loginForm = async (req, res) => {
  return res.redirect("login-form.html");
};

const loggedUser = async (req, res) => {
  return res.send(req.session.username);
};

const logout = async (req, res) => {
  const username = await req.session.username;
  await req.session.destroy();

  return res.send(`Hasta luego, ${username}.`);
};

export { login, loginForm, loggedUser, logout };

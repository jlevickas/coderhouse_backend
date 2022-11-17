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

  await res.write(`Hasta luego, ${username}.`);
  setTimeout(() => {
    res.redirect("/");
  }, 2000);
};

export { login, loginForm, loggedUser, logout };

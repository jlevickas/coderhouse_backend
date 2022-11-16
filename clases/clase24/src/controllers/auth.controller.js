const login = async (req, res) => {
  const username = await req.query.username;

  req.session.username = username;
  await req.session.save();

  return res.redirect("/");
};

const logout = async (req, res) => {
  const username = await req.session.username;
  await req.session.destroy();

  return res.send(`Hasta luego, ${username}.`);
};

export { login, logout };

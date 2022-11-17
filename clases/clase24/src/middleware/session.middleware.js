const sessionMiddleware = async (req, res, next) => {
  const username = await req.session.username;
  if (!username) {
    console.log("No hay usuario logueado");
    return res.redirect("login-form.html");
  }
  next();
};

export default sessionMiddleware;

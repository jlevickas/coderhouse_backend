const sessionMiddleware = async (req, res, next) => {
  if (req.path === "/login") {
    next();
    return;
  }
  const username = await req.session.username;
  if (!username) {
    await res.redirect("/login");
    return
  }
  next();
};

export default sessionMiddleware;

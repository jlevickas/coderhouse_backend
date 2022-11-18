const sessionMiddleware = async (req, res, next) => {
  if (req.path === "/login") {
    next();
    return;
  }
  const userEmail = await req.session.email;
  if (!userEmail) {
    await res.redirect("/login");
    return
  }
  next();
};

export default sessionMiddleware;

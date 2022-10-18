function Authorize(req, res, next) {
  if (typeof req.session.isAuth != "undefined") {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
  next();
}
module.exports = { Authorize };

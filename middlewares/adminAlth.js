async function adminAuth(req, res, next) {
  if (req.session.user === undefined) {
    res.redirect("/home");
  } else if (req.session.user.admin === true) {
    next();
  } else {
    res.redirect("/home");
  }
}
module.exports = adminAuth;

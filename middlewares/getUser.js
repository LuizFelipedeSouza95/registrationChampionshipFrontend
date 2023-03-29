async function getUser(req, res, next) {
  const user = req.session.user;
  if (user === undefined) {
    res.redirect("/login");
  } else {
    next();
  }
}

module.exports = getUser;

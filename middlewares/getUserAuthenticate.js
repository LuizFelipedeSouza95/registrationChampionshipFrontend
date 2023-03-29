async function getUserAuthenticate(req, res, next) {
  const response = await fetch(`http://localhost:3000/searchAllUser`);
  const result = await response.json();
  res.locals.users = result
  return next();
}
module.exports = getUserAuthenticate;

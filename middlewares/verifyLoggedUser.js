module.exports = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(201).redirect("/user/login");
  }
};

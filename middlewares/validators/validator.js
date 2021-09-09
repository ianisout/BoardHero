const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors
      .map((item) => `${item.param}: ${item.msg}`)
      .join("\n");
    throw new Error(errorMessage);
  }
  next();
};

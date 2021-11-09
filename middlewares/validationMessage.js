// const { validationResult } = require("express-validator");

// module.exports = (req, res, next) => {
//   const errors = validationResult(req);
//   // console.log(errors);

//   if (!errors.isEmpty()) {
//     // const errorMessage = errors.errors
//     //   .map((item) => `${item.param}: ${item.msg}`)
//     //   .join("\n");
//     // throw new Error(errorMessage);

//     res.render("signup", { errors: errors.array({ onlyFirstError: true }) });
//   }

//   next();
// };

const { body } = require("express-validator/check");

exports.userSignupValidator = (req, res, next) => {
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 2000,
    });
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 6 characters")
  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

exports.userSigninValidator = (request, res, next) => {
  request
    .check("email", "Email must be between 3 to 32 characters")
    .matches(
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    )
    .withMessage("Please type your valid email address")
    .isLength({
      min: 4,
      max: 32,
    });
  request.check("password", "Invalid Social Login Token!").notEmpty();
  request
    .check("password")
    .isLength({ min: 8 })
    .withMessage("Your social login token is invalid!");
  const errors = request.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
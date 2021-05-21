const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const User = require("../models/user");
const _ = require("lodash");
const dotenv = require("dotenv");
dotenv.config();


//@desc  -  SignUp controller
//@Usage -  Will be used when application accepts Username and Password from User
exports.signup = async (req, res, next) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(403).json({
      error: "An user with this email already exists!",
    });
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ message: "Signup success! Please login." });
  next();
};

//@desc  -  SignIn controller
//@Usage -  Will be used when application accepts Username and Password from User
exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist. Please signup.",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECERT
    );
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = user;
    console.log("Token ", token, user)
    return res.json({ token, user: { _id, email, name, role } });
  });
};

//@desc  -  Signs Out User from Appication
//@Usage -  Will be used when application accepts Username and Password from User
exports.signout = (req, res) => {
  console.log("Back end Signout")
  res.clearCookie("t");
  return res.json({ message: "Signout success!" });
};

//@desc  -  Checks whether the user is signed In or not based on the token
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECERT,
  algorithms: ["HS256"],
  userProperty: "auth",
});



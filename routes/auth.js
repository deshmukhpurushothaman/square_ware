const express = require('express');
const { signup, signin, signout } = require('../controllers/auth');
const { userSignupValidator, userSigninValidator, } = require('../validator');


//Initializing Router
const router = express.Router();

//Routers

//@path     POST  /api/signup
//@desc     SignUP a new User
//@access   PUBLIC
router.post('/signup', userSignupValidator, signup);

//@path     POST  /api/signin
//@desc     User Signin
//@access   PUBLIC
router.post('/signin', userSigninValidator, signin);

//@path     GET /api/signout
//@desc     Signout User
//@access   PUBLIC
router.get('/signout', signout);




module.exports = router;

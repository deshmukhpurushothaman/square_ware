const express = require("express");
const {
   s3createPost
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

//Initializing Router
const router = express.Router();



router.post("/s3/:userId",  upload.single('image'), s3createPost);



module.exports = router;

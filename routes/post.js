const express = require("express");
const {
   profile
} = require("../controllers/post");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

//Initializing Router
const router = express.Router();



router.post("/profile/:userId",  upload.single('image'), profile);



module.exports = router;

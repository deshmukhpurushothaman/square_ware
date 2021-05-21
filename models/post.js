const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//Database Schema
const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  image: {
    type: String,
    required: true,
},
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
  },  
});

module.exports = mongoose.model("Post", postSchema);

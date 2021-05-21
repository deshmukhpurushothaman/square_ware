const mongoose = require("mongoose");

const connectDB = async () => {
  
    let mongo_db_URI;

    
      mongo_db_URI = process.env.MONGO_URI_DEV;
    
    console.log(mongo_db_URI);
    const connection = await mongoose.connect(mongo_db_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }).then(() => console.log("DB Connected"))
    //console.log(`MongoDB Connected : ${connection.connection.host}`);
  
    mongoose.connection.on("error", err => {
      console.log("DB Connection error "+ err);
  });
};

module.exports = connectDB;

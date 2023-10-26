const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/web_blog_main");
    console.log("Connect DB Success");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;

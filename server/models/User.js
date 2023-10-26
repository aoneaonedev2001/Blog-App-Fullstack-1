const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 2,
      max:50,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      min: 5,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema)

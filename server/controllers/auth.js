const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");


//----regsiter
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // check user
    var user = await User.findOne({ username });
    if (user) {
      return res.status(400).send("User Already exists");
    }
    //Create a new user
    const userNew = new User({
      username,
      email,
      password,
    });
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    userNew.password = await bcrypt.hash(password, salt);
    await userNew.save();
    res.send("Register Success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};


//---- Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    //if same user then compare password
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Password Invalid!!");
      }
      //Generate Payload
      const payload = {
        user: {
          username: user.username,
          role: user.role,
        },
      };
      // Generate Token
      jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      // if not have user
      return res.status(400).send("User Not found!!!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};


//---- currentUser
exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }) //req.user เป็นuserที่ผ่านการ decoded หรือ verify เเล้ว เอามาจาก middlewere เป็นตัวเเปลที่สร้างไว้
      .select("-password")
      .exec();
      //console.log(user);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

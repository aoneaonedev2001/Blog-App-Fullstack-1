const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post")



//----listUsers
exports.listUsers = async (req, res) => {
  try {
    // Code
    const user = await User.find({}).select("-password").exec();
    res.send(user);//ส่งไปหน้าบ้าน 
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};


//----readUsers
exports.readUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select("-password").exec();
    res.send(user); 
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};


//----updateUsers 
exports.updateUsers = async (req, res) => {
  try {         
    const {id, password} = req.body.values
    //  new password encrypt  
    const salt = await bcrypt.genSalt(10);
    var enPassword = await bcrypt.hash(password, salt);

    const user = await User.findOneAndUpdate(
      { _id: id },             
      { password: enPassword } 
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};


//----removeUsers 
exports.removeUsers = async (req, res) => {
  try {
    const id = req.params.id;
     // delete user account
    const user = await User.findOneAndDelete({ _id: id });
    try {
      // delete all post of user
      await Post.deleteMany({ username: user.username })
    } catch (error) {
      res.status(500).json(error)
    }
    res.send(user);   
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};


//----changeRole
exports.changeRole = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },   
      { role: req.body.role }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};



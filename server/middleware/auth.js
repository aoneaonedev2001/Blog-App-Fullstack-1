const jwt = require("jsonwebtoken");
const User = require("../models/User");

//1 authCheck   ( decoded token)
exports.auth = (req, res, next) => { 
  try {
    const token = req.headers["authtoken"];
    //console.log(token);                  //  get the token sent from the header
    if (!token) {                                            // if don'n have token
      return res.status(401).send("no token , authorization denied");
    }               
    const decoded = jwt.verify(token, "jwtSecret");          // verify หรือตรวจสอบว่าตรงกันไหม
    //console.log("middleware", decoded);                      //decoded คือ token ที่ผ่านการ verify
    req.user  = decoded.user                                 //ยัดใส่ตัวเเปล รอเลียกใช้ ตรง adminCheck 
    //console.log(req.user);
    next()                                                   //next คือการปล่อยให้ ไปทำงานที่ controler ต่อ ผ่านการเช็คเเล้ว
  } catch (err) {
    console.log(err);
    res.status(401).send("Token Invavid!!");
  }
};


//2 adminCheck  (check roll Admin)
exports.adminCheck = async(req, res, next) => {
  try {
    const { username } = req.user                             // req ที่ส่งมาจากหน้าบ้าน เอาข้อมูล username มา
    const adminUser = await User.findOne({ username }).exec() // เอา username ไปเช็คกับฐานข้อมูล ว่ามีตรงไหม
    if(adminUser.role !== 'admin'){                           //เช็ค สถานะ role ถ้าไม่เท่ากับ admin ส่ง err
      res.status(403).send(err,'Admin Access denied')
    } else{
      next()                                                 //next คือการปล่อยให้ ไปทำงานที่ controler ต่อ ผ่านการเช็คเเล้ว
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("Admin Access denied");
  }
};

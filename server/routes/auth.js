const express = require("express");
const router = express.Router();

//controller
const {register,login,currentUser} = require("../controllers/auth");

// middleware 
const { auth,adminCheck } = require("../middleware/auth");


router.post("/register", register);
router.post("/login", login);
router.post("/current-user", auth, currentUser);             // use middleware (auth)
router.post("/current-admin", auth,adminCheck, currentUser); // use middleware (auth, adminCheck)

module.exports = router;

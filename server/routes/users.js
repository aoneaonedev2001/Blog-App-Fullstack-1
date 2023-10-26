const express = require("express");
const router = express.Router();

//controller
const {
  listUsers,
  readUsers,
  updateUsers,
  removeUsers,
  changeRole,
} = require("../controllers/users");

// middleware
const { auth, adminCheck } = require("../middleware/auth");


router.get("/users",auth, adminCheck, listUsers);
router.get("/users/:id", readUsers);
router.put("/users/:id", auth, adminCheck, updateUsers);
router.delete("/users/:id", removeUsers);
router.post("/change-role", auth, adminCheck, changeRole);

module.exports = router;

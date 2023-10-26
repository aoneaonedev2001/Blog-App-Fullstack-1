const express = require("express");
const router = express.Router();


//controller
const {
  createPost,
  readPost,
  listPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

// middleware
const { auth, adminCheck } = require("../middleware/auth");


router.post("/posts", auth, createPost)
router.get("/posts/:id", readPost)
router.get("/posts", listPost)
router.put("/posts/:id", auth, updatePost)
router.delete("/posts/:id", auth, deletePost)

module.exports = router;

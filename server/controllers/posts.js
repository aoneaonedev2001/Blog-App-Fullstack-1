const Post = require('../models/Post');


//----createPost
exports.createPost =async (req, res) =>{
    const newPost = new Post(req.body)
    try {
      const savePost = await newPost.save()
      res.status(200).json(savePost)
    } catch (error) {
      res.status(500).json(error)
    }
};


//----readPost
exports.readPost= async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
      } catch (error) {
        res.status(404).json(error)
      }
};


//----listPost
exports.listPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json(error);
  }
};


//----updatePost
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: req.params.id },
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can only update your own post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//----deletePost
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await Post.deleteOne({ _id: post._id });
        res.status(200).json("Post has been deleted!");
      } catch (error) {
        res.status(500).json(error);
        console.log(error);
      }
    } else {
      res.status(401).json("You can only delete your own post!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};








const { validationResult } = require("express-validator");
const Post = require("../models/postModel");
const path = require("path");
const fs = require("fs");
const router = require("../router/authRouter");
const { clear } = require("console");

const throwError = (errCode, message, data) => {
  const err = new Error(message);
  err.statusCode = errCode;
  err.data = data;
  return err;
};

//Serving Posts
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await (
      await Post.find().populate("postBy", "firstname email")
    ).reverse();
    res.status(200).json({
      status: true,
      posts: posts,
    });
  } catch (err) {
    return next(throwError(500, "Something went wrong", {}));
  }
};

//Get post by id
exports.getByIdPost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findOne({ _id: postId });
    return res.status(200).json({
      status: true,
      post: post,
    });
  } catch (err) {
    return next(throwError(422, "Invalid PostId", {}));
  }
};

//Creating post
exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(throwError(400, "Validation failed", errors.array()));
  }
  if (!req.file) {
    return next(
      throwError(422, "Image is required or invalid file extension", null)
    );
  }
  const title = req.body.title;
  const description = req.body.description;
  const imageFile = req.file;
  const image = imageFile.path;

  try {
    const newPost = await new Post({
      title: title,
      description: description,
      image: image,
      postBy: req.userId,
    }).save();

    res.status(201).json({
      status: true,
      message: "Created successfully",
      post: newPost,
    });
  } catch (err) {
    return next(500, "Something went wrong", err);
  }
};

//Updating Post
exports.updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(throwError(400, "Validation failed", errors.array()));
  }
  const title = req.body.title;
  const description = req.body.description;
  const imageFile = req.file;
  const postId = req.params.postId;
  let image;
  try {
    const post = await Post.findOne({ _id: postId });
    if (req.file) {
      image = imageFile.path;
      filePath = post.image;
      clearImage(filePath, next);
    }
    image = post.image;

    post.title = title;
    post.description = description;
    post.image = image;

    await post.save();

    res.status(201).json({
      status: true,
      message: "Updated successfully",
      post: post,
    });
  } catch (err) {
    return next(throwError(500, "Something went wrong", err));
  }
};

//Delete Post
exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findOne({ _id: postId });
    filePath = path.join(__dirname, "..", post.image);
    await clearImage(filePath, next);
    await Post.findByIdAndDelete(postId);
    return res.status(200).json({
      status: true,
      message: "Deleted Successfully",
    });
  } catch (err) {
    return next(throwError(500, "Something went wrong", err));
  }
};

//Deleting Iage
clearImage = (filePath, next) => {
  fs.unlink(filePath, (err) => {
    if (err) next(err);
  });
};

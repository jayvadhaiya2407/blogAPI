const { validationResult } = require("express-validator");
const Post = require("../models/postModel");

const throwError = (errCode, message, data) => {
  const err = new Error(message);
  err.statusCode = errCode;
  err.data = data;
  return err;
};

//Serving Posts
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await (await Post.find()).reverse();
    res.status(200).json({
      status: true,
      posts: posts,
    });
  } catch (err) {
    return next(throwError(500, "Something went wrong", null));
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

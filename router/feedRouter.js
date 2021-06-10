const { body } = require("express-validator");
const express = require("express");
const router = express.Router();

const feedController = require("../controller/feedController");
const Post = require("../models/postModel");

const isAuth = require("../middlewares/isAuth");

router.get("/posts", feedController.getPosts);

router.post(
  "/post/create",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("Title must be atleast 5 char long"),
    body("description")
      .isLength({ min: 120 })
      .withMessage("Description must be atleast 120 char long"),
    body("image").isEmpty().withMessage("Image is required"),
  ],
  isAuth,
  feedController.createPost
);

module.exports = router;

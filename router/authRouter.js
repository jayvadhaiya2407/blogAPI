const { body } = require("express-validator");
const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");
const User = require("../models/userModel");

//Create User
router.post(
  "/create",
  [
    body("firstname")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Firstname must be atleast 3 char long.")
      .escape(),
    body("lastname")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Lastname must be atleast 3 char long.")
      .escape(),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password length must be atleast 8 chars")
      .custom((pass, { req }) => {
        return pass === req.body.cpassword;
      })
      .withMessage("Confirm password do not matched")
      .escape(),
  ],
  authController.createUser
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject("E-Mail address not exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password length must be atleast 8 chars")
      .escape(),
  ],
  authController.loginUser
);

module.exports = router;

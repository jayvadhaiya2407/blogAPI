const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");

//Handaling Error
const throwError = (errCode, message, data) => {
  const err = new Error(message);
  err.statusCode = errCode;
  err.data = data;
  return err;
};

//Creating User
exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(throwError(422, "Validation failed", errors.array()));
  }
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await new User({
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      status: true,
      message: "User created successfully",
    });
  } catch (err) {
    next(throwError(500, "Something went wrong", err));
  }
};

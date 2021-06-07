const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const throwError = (errCode, message) => {
  const err = new Error(message);
  err.statusCode = errCode;
  throw err;
};

exports.createUser = async (req, res, next) => {
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
    throwError(500, "Something went wrong");
  }
};

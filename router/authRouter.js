const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");

router.post("/create", authController.createUser);

module.exports = router;

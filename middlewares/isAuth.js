const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Authorization Token Required",
    });
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "thisistoptoptopsecret");
    if (!decodedToken) {
      const err = new Error("Not Authorized");
      err.statusCode(401);
      return next(err);
    }
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    err.statusCode = 500;
    err.messsage = "Something went wrong";
    throw err;
  }
};

module.exports = isAuth;

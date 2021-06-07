const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  posts: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    },
  ],
});

module.exports = mongoose.model("User", userModel);

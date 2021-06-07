const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postModel = Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  likedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
      },
    },
  ],
  user: {
    type: Schema.types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", postModel);

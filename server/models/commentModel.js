import mongoose from "mongoose";

// Reaction schema for comments
const reactionSchema = new mongoose.Schema({
  like: {
    type: Number,
    default: 0,
  },
  heart: {
    type: Number,
    default: 0,
  },
  smile: {
    type: Number,
    default: 0,
  },
  usersLiked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  usersLoved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  userSmiled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Comment schema
const commentSchema = new mongoose.Schema({
  filmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Film",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  reaction: [reactionSchema],
});

const Comment = mongoose.model("Comment", commentSchema);

export { Comment };

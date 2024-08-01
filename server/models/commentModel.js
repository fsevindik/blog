import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
  like: {
    type: Number,
    default: 0,
  },
  usersLiked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

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
  reaction: {
    type: reactionSchema,
    default: () => ({}),
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;

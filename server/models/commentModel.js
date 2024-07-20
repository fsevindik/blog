// Reaction for comment
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
  usersLiked: [],
  usersLoved: [],
  userSmiled: [],
});

const CommentSchema = new mongoose.Schema({
  filmId: { type: mongoose.Schema.Types.ObjectId, ref: "Film", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  replies: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  reaction: [reactionSchema],
});
const Comment = mongoose.model("Comment", CommentSchema);
export { Comment };

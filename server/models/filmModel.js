import mongoose from "mongoose";

// Rate schema
const rateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
});

const actorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

//film Schema
const filmSchema = new mongoose.Schema(
  {
    filmId: {
      type: String,
      unique: true,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    title: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    posterImageUrlA: {
      type: String,
      required: true,
    },
    bannerImageUrlB: {
      type: String,
      required: true,
    },
    actors: {
      type: [actorSchema],
      validate: [arrayLimit, "{PATH} exceeds the limit of 5"],
    },
    ratings: [rateSchema],
    filmOverview: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// learn this woaoov thx claude ai :)
function arrayLimit(val) {
  return val.length <= 5;
}

filmSchema.methods.calculateAverageRating = function () {
  if (this.ratings.length === 0) return 0;
  const total = this.ratings.reduce((sum, rating) => sum + rating.rating, 0);
  return total / this.ratings.length;
};

const Film = mongoose.model("Film", filmSchema);

export { Film };

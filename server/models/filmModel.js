import mongoose from "mongoose";

const rateSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const filmSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    director: { type: String, required: true, trim: true },
    releaseDate: { type: Number, required: true },
    imageA: { type: String, required: true },
    imageB: { type: String, required: true },
    ratings: [rateSchema],
    filmOverview: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

filmSchema.virtual("averageRating").get(function () {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((total, rate) => total + rate.rating, 0);
  return (sum / this.ratings.length).toFixed(1);
});

const Film = mongoose.model("Film", filmSchema);

export default Film;

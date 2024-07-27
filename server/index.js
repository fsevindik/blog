import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import commentRoutes from "./routes/commentRoutes.js";
import filmRoutes from "./routes/filmRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import reactionRoutes from "./routes/reactionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/films", filmRoutes);
app.use("/films/:filmId/reactions", reactionRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);
app.use("/comments", commentRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "An unexpected error occurred",
    error: process.env.NODE_ENV === "production" ? {} : err,
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to the Film API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

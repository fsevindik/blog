import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import filmRoutes from "./routes/filmRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import reactionRoutesRoutes from "./routes/reactionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/films", filmRoutes);
app.use("/api/users", userRoutes);
app.use("/api/films", reactionRoutesRoutes);
app.use("/api/messages", messageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "An unexpected error occurred",
    error: process.env.NODE_ENV === "production" ? {} : err,
  });
});

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Film API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

import express from "express";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, content } = req.body;

  try {
    const adminUser = await User.findOne({ role: "admin" });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const message = new Message({
      sender: userId,
      recipient: adminUser._id, // Admin
      content,
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const adminUser = await User.findOne({ role: "admin" });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const messages = await Message.find({
      $or: [
        { sender: req.params.userId, recipient: adminUser._id },
        { sender: adminUser._id, recipient: req.params.userId },
      ],
    }).sort("sentAt");

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin messages
router.get("/admin/:adminId", async (req, res) => {
  try {
    const { adminId } = req.params;

    const messages = await Message.find({
      $or: [{ sender: adminId }, { recipient: adminId }],
    }).sort("sentAt");

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

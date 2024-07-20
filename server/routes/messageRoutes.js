import express from "express";
import { Message } from "../models/messageModel.js";

const router = express.Router();

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin only." });
  }
};

// Get all messages (admin only)
router.get("/getmessages", isAdmin, async (req, res) => {
  try {
    const messages = await Message.find().populate("sender", "name email");
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Server error");
  }
});

// Get messages
router.get("/getmessages/:userId", async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.params.userId }, { recipient: req.params.userId }],
    }).sort("-sentAt");
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Server error");
  }
});

// Send a message
router.post("/sendmessage", async (req, res) => {
  const { sender, recipient, content } = req.body;

  try {
    const message = new Message({
      sender,
      recipient,
      content,
    });

    await message.save();
    console.log("Message sent successfully");

    res.status(201).json(message);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Respond to a message (admin only)
router.post("/respondmessage/:messageId", isAdmin, async (req, res) => {
  const { content } = req.body;
  const { messageId } = req.params;

  try {
    const originalMessage = await Message.findById(messageId);
    if (!originalMessage) {
      return res.status(404).json({ message: "Original message not found" });
    }

    const responseMessage = new Message({
      sender: req.user._id,
      recipient: originalMessage.sender,
      content,
    });

    await responseMessage.save();
    console.log("Response sent successfully");

    res.status(201).json(responseMessage);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete a message by ID (admin only)
router.delete("/deletemessage/:messageId", isAdmin, async (req, res) => {
  const { messageId } = req.params;
  try {
    const deletedMessage = await Message.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    res
      .status(200)
      .json({ message: "Message deleted successfully", deletedMessage });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

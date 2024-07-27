import express from "express";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

const router = express.Router();

// Y
router.post("/conversation", async (req, res) => {
  const { userId, adminId } = req.body;

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, adminId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [userId, adminId],
      });
      await conversation.save();
    }

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//
router.post("/sendmessage", async (req, res) => {
  const { conversationId, sender, content } = req.body;

  try {
    const message = new Message({
      conversation: conversationId,
      sender,
      content,
    });

    await message.save();
    await Conversation.findByIdAndUpdate(conversationId, {
      updatedAt: Date.now(),
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//
router.get("/getmessages/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversation: req.params.conversationId,
    })
      .sort("-sentAt")
      .populate("sender", "name");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

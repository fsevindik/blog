import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    maxLength: 500 
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

announcementSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;

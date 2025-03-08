import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
  text: {  
    type: String,
    required: true,
  },
  added: { 
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id; 
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const WishList = mongoose.model("WishList", wishListSchema);

export default WishList;

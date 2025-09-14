const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    customerName: { 
      type: String, 
      required: true, 
      trim: true 
    }, // Tự động lấy từ User
    message: { 
      type: String, 
      required: true 
    },
    rating: { 
      type: Number, 
      min: 1, 
      max: 5, 
      default: 5 
    },
    imageUrls: { 
      type: [String], 
      default: [] 
    },
    videoUrl: { 
      type: String, 
      default: "" 
    },
    source: { 
      type: String, 
      enum: ["WEBSITE", "FACEBOOK", "ZALO", "OTHER"], 
      default: "WEBSITE" 
    },
    published: { 
      type: Boolean, 
      default: true 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema, "feedbacks");

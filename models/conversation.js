const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
      index: true,
    },
    ownerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    interestedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    lastMessagePreview: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    hasPendingQuestion: {
      type: Boolean,
      default: false,
      index: true,
    },
    questionCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

conversationSchema.index(
  { vehicleId: 1, ownerUserId: 1, interestedUserId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);

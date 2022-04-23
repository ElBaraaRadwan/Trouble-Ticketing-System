const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: false,
      enum: ["Very Happy", "Happy", "Good", "Sad", "Vrey Sad"], // could use 🙂 🙁 😐 😠
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = feedbackSchema;

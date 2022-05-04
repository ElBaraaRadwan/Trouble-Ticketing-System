const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title must be provided"],
      maxlength: [30, "Title Can't be More than 30 Char"],
    },
    description: {
      type: String,
      required: [true, "Decription must be provided"],
      maxlength: [1000, "Description Can't be More than 1000 Char"],
    },
    attachment: [Object],
    audioRecord: Blob,
    priorty: {
      type: String,
      default: "Low",
      enum: ["Low", "Mediem", "High"],
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Solved", "Closed"],
    },
    reply: {
      type: String,
    },
    solve: {
      type: String,
    },
    department: {
      type: String,
      required: [true, "Department must be provided"],
      enum: [
        "Sales",
        "Tech-Sup",
        "Devices-Com",
        "Devices-TV",
        "Devices-Mob",
        "Devices-Air",
      ],
    },
    ticketUpdatedTime: { type: Date },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    agent: {
      type: mongoose.Schema.ObjectId,
      ref: 'Agents',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ticketSchema;
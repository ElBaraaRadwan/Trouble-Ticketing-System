const mongoose = require("mongoose");

const d = new Date();

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
    audioRecord: [Object],
    priorty: {
      type: String,
      default: "Low",
      enum: ["Low", "Mediem", "High"],
    },
    status: {
      type: String,
      default: "Pending",
      enum: [
        "Pending",
        "In-Progress",
        "User-Reply",
        "Finished",
        "In-hold",
        "Canceled",
      ],
    },
    reply: [
      {
        type: String,
      },
    ],
    solve: [
      {
        type: String,
      },
    ],
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
    ticketUpdatedTime: {
      type: String,
      default: `${d.getDate() + 1}-${d.getMonth() + 1}-${d.getFullYear()}`,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agents",
    },
    createdDate: {
      type: String,
      default: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ticketSchema;

const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    header: {
      type: String,
      required: [true, "Header must be provided"],
      maxlength: [255, "Header Can't be More than 255 Char"],
    },
    content: {
      type: String,
      required: [true, "Content must be provided"],
    },
    attachment: [Object],
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
  },
  {
    timestamps: true,
  }
);

module.exports = faqSchema;

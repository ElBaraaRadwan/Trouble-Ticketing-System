const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  header: {
    type: String,
    required: [true, "Title must be provided"]
  },
  content: {
    type: String,
    maxlength: [255, "Can't be More than 255 Char"]
  },
  agent: {
    type: mongoose.Schema.ObjectId,
    ref: 'Agents',
  },
});

module.exports = reportSchema;

const mongoose = require('mongoose');
const feedbackSchema = require('../Schema/feedbackSchema');

const FeedBack = mongoose.model("FeedBack", feedbackSchema);

module.exports = FeedBack;
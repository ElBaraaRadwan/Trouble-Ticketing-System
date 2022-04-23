const mongoose = require('mongoose');
const faqSchema = require('../schema/FAQsSchema');

const FAQs = mongoose.model("FAQs", faqSchema);

module.exports = FAQs;
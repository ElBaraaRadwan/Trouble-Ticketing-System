const mongoose = require('mongoose');
const reportSchema = require('../Schema/reportSchema');

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
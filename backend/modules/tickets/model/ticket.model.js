const mongoose = require('mongoose');
const ticketSchema = require('../schema/ticketSchema');

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
const Ticket = require("../model/ticket.model");
const User = require('../../users/Model/user.model')
const { sendTicketDely } = require("../../../utils/Mails");

exports = function () {
  const ticketTimeToUpdate = await Ticket.find({ ticketUpdatedTime });
  const ticketPriortyToUpdate = await Ticket.find({ priorty });

  const oneDay = 1000 * 60 * 60 * 24 * 1; // millisec * min * huor * day * how many days
  const priortyUpdation = new Date(Date.now() + oneDay);

  if (ticketPriortyToUpdate === "Low" && ticketTimeToUpdate === Date.now()) {
    let ticketUpdating = await Ticket.updateMany(
      {/*ticketUpdatedTime: ticketTimeToUpdate, priorty: ticketPriortyToUpdate */},
      { ticketUpdatedTime: priortyUpdation, priorty: "Mediem" }
    );
  } else if (
    ticketPriortyToUpdate === "Mediem" &&
    ticketTimeToUpdate === Date.now()
  ) {
    let ticketUpdating = await Ticket.updateMany(
      {/*ticketUpdatedTime: ticketTimeToUpdate, priorty: ticketPriortyToUpdate */},
      { ticketUpdatedTime: priortyUpdation, priorty: "High" }
    );
  } else if (
    ticketPriortyToUpdate === "High" &&
    ticketTimeToUpdate === Date.now()
  ) {
    let getTicketsID = await Ticket.find({_id});
    let getUserUsingTicketID = await User.find({createdTickets: [...getTicketsID]})

    let ticketUpdating = await Ticket.updateMany(
      {/*ticketUpdatedTime: ticketTimeToUpdate, priorty: ticketPriortyToUpdate */},
      { ticketUpdatedTime: priortyUpdation }
    );
    sendTicketDely(User.name);
  }
};

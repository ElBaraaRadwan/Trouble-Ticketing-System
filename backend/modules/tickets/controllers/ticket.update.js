const Ticket = require("../model/ticket.model");
const User = require('../../users/Model/user.model')
const { sendTicketDely, sendTicketDelyToAdmin } = require("../../../utils/Mails");
const cron = require('node-cron');

let d = new Date()
const priortyUpdation = `${d.getDate() + 1}-${d.getMonth() + 1}-${d.getFullYear()}`;
const timeForUpdate = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;

exports = function () {
  const ticketTimeToUpdate = await Ticket.find({ ticketUpdatedTime });
  const ticketPriortyToUpdate = await Ticket.find({ priorty });
  const ticketStatus = await Ticket.find({status});
  
  if(ticketStatus === "In-hold") {
    
    let TicketCancellation = await Ticket.updateMany({status: ticketStatus}, {status: "Canceled"})

    if(ticketStatus !== "Finished" || ticketStatus !== "Canceled") 

     if (ticketPriortyToUpdate === "Low" && ticketTimeToUpdate === timeForUpdate) {

      let ticketUpdating = await Ticket.updateMany(
        {/*ticketUpdatedTime: ticketTimeToUpdate, priorty: ticketPriortyToUpdate */},
        { ticketUpdatedTime: priortyUpdation, priorty: "Mediem" }
      );

    } else if (
      ticketPriortyToUpdate === "Mediem" &&
      ticketTimeToUpdate === timeForUpdate
    ) {

      let ticketUpdating = await Ticket.updateMany(
        {/*ticketUpdatedTime: ticketTimeToUpdate, priorty: ticketPriortyToUpdate */},
        { ticketUpdatedTime: priortyUpdation, priorty: "High" }
      );

    } else if (
      ticketPriortyToUpdate === "High" &&
      ticketTimeToUpdate === timeForUpdate
    ) {

      let getTicketsID = await Ticket.find({_id});
      let getUserUsingTicketID = await User.find({createdThings: [...getTicketsID]})
      let Admin = User.find({role: "admin"})
  
      let ticketUpdating = await Ticket.updateMany(
        {/*ticketUpdatedTime: ticketTimeToUpdate, priorty: ticketPriortyToUpdate */},
        { ticketUpdatedTime: priortyUpdation }
      );

      sendTicketDely(User.name, User.email);
      sendTicketDelyToAdmin(Admin.name, Admin.email, This.Ticket._id);
    }
  }
};

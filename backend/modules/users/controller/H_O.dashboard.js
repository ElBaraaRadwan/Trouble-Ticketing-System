const Tickets = require("../../tickets/model/ticket.model");
const Reports = require("../../reports/Model/reportModel");
const FAQs = require("../../FAQs/model/FAQs.model");
const Feedbacks = require("../../feedback/Model/feedback.model");
const Users = require("../Model/user.model");

const Dashboard = async (req, res) => {
  const users = await Users.find({}, {}, { sort: { _id: -1 } }).select(
    "-password"
  );
  const tickets = await Tickets.find({}, {}, { sort: { _id: -1 } }).exec();
  const feedBack = await Feedbacks.find({}, {}, { sort: { _id: -1 } });
  const faqs = await FAQs.find({}, {}, { sort: { _id: -1 } });
  const reports = await Reports.find({}, {}, { sort: { _id: -1 } });

  res.json({
    UserData: { users },
    TicketData: { tickets },
    FeedbackData: { feedBack },
    FAQ_Data: { faqs },
    ReportData: { reports },
  });
};

module.exports = {Dashboard}
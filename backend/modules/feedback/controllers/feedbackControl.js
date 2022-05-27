const User = require("../../users/Model/user.model");
const FeedBack = require("../Model/feedback.model");
const asyncWrapper = require("../../../middlewares/async");
const { StatusCodes } = require("http-status-codes");
const Ticket = require("../../tickets/model/ticket.model");

const createFeedBack = asyncWrapper(async (req, res) => {
  const { id: ticketID } = req.params;
  const { userID, status } = req.body;
  const feedBack = await FeedBack.create({
    status,
    user: userID,
    ticket: ticketID,
  });
  const ticket = await Ticket.findByIdAndUpdate(
    { _id: ticketID },
    { status: "Finished" }
  );
  res.status(StatusCodes.CREATED).json({ feedBack });
});

const getAllFeedBacks = asyncWrapper(async (req, res) => {
  const feedBack = await FeedBack.find({});
  res.status(StatusCodes.OK).json({ feedBack });
});

module.exports = {
  createFeedBack,
  getAllFeedBacks,
};

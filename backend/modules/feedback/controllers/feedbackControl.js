const User = require("../../users/Model/user.model");
const FeedBack = require("../Model/feedback.model");
const asyncWrapper = require("../../../middlewares/async");
const { StatusCodes } = require("http-status-codes");

const createFeedBack = asyncWrapper(async (req, res) => {
  const { id: ticketID } = req.params;
  const { userID, status, content } = req.body;
  const feedBack = await FeedBack.create({
    status,
    content,
    user: userID,
    ticket: ticketID,
  });
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

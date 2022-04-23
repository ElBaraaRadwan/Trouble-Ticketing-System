const User = require("../../users/Model/user.model");
const FeedBack = require("../Model/feedback.model");
const asyncWrapper = require("../../../middlewares/async");

const createFeedBack = asyncWrapper(async (req, res) => {
  const feedBack = await FeedBack.create(req.body);
  res.status(201).json({ feedBack });
});

const getAllFeedBacks = asyncWrapper(async (req, res) => {
  const feedBack = await FeedBack.find({});
  res.status(200).json({ feedBack });
});


module.exports = {
  createFeedBack,
  getAllFeedBacks,
};

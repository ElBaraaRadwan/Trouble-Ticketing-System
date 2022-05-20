const User = require("../../users/Model/user.model");
const Report = require("../Model/reportModel");
const asyncWrapper = require("../../../middlewares/async");
const { StatusCodes } = require("http-status-codes");
const { sendReport } = require("../../../utils/Mails");

const createReport = asyncWrapper(async (req, res) => {
  const { header, content, agent } = req.body;
  const report = await Report.create({ header, content, agent });

  let agentReports = await Report.find({ agent });

  const sendReport = await User.findOneAndUpdate(
    { _id: agent },
    {
      createdThings: [...agentReports],
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.CREATED).json({ report });
  // sendReport(Admin.name, Admin.email, req.body._id);
});

const getAllReports = asyncWrapper(async (req, res) => {
  const report = await Report.find({}, {}, { sort: { _id: -1 } });
  res.status(StatusCodes.OK).json({ report });
});

const deleteReport = asyncWrapper(async (req, res) => {
  const { id: reportID } = req.params;
  const report = await Report.findOneAndDelete({ _id: reportID });
  if (!ticket) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(`No report with id : ${reportID}`);
  }
  res.status(StatusCodes.OK).json({ report });
});

const editReport = asyncWrapper(async (req, res) => {
  const allowedUpdates = ["header", "content"];
  const keys = Object.keys(req.body);
  const isUpdationValid = keys.every((key) => allowedUpdates.includes(key));
  if (!isUpdationValid)
    res.status(StatusCodes.BAD_REQUEST).json("You can only reply");

  const { id: reportID } = req.params;

  const report = await Report.findOneAndUpdate(
    {
      _id: reportID,
    },
    {
      header: req.body.header,
      content: req.body.content,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!report)
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(`No report with id : ${reportID}`);
  res.status(StatusCodes.OK).json(report);
  next(res.status(StatusCodes.BAD_REQUEST).json(error));
});

module.exports = {
  createReport,
  getAllReports,
  deleteReport,
  editReport,
};

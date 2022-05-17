const Agent = require("../../users/Model/user.model");
const Admin = require("../../users/Model/user.model");
const Report = require("../Model/reportModel");
const asyncWrapper = require("../../../middlewares/async");
const { StatusCodes } = require("http-status-codes");
const { sendReport } = require("../../../utils/Mails");

const createReport = asyncWrapper(async(req, res) => {
    const { header, content, agent } = req.body;
    const report = await Report.create({ header, content, agent });

    let userReports = await Report.find({ agent });

    const sendReport = await User.findOneAndUpdate(
      { _id: agent },
      {
        createdThings: [...userReports],
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(StatusCodes.CREATED).json({ report });
    // sendReport(Admin.name, Admin.email, req.body._id);
});

const getAllReports = asyncWrapper(async(req, res) => {
    const report = await Report.find({});
    res.status(StatusCodes.OK).json({ report });
});

const deleteReport = asyncWrapper(async(req, res) => {
    const { id: reportID } = req.params;
    const report = await Report.findOneAndDelete({ _id: reportID });
    if (!ticket) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json(`No report with id : ${reportID}`);
    }
    res.status(StatusCodes.OK).json({ report });
});

module.exports = {
    createReport,
    getAllReports,
    deleteReport,
};
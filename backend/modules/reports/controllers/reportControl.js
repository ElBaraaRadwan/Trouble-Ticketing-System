const Agent = require("../../users/Model/user.model");
const Admin = require("../../users/Model/user.model");
const Report = require("../Model/reportModel");
const asyncWrapper = require("../../../middlewares/async");
const { StatusCodes } = require("http-status-codes");
const { sendReport } = require("../../../utils/Mails");

const createReport = asyncWrapper(async(req, res) => {
    const { header, content } = req.body;
    const report = await Report.create({ header, content, Agent: req.params.id });
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

// Func that find reports that been created by a user  [NOT READY YET]
//   const reportByUser = asyncWrapper(async (req, res) => {
//     const { id } = req.params;
//     const user = await User.findById(id).populate("reports");
//     res.status(200).json({ user });
//   });

// Func that find User that been create a report
const userByReport = asyncWrapper(async(req, res) => {
    const { id } = req.params;
    const agent = await Agent.findById(id).populate("Report");
    res.status(StatusCodes.OK).json({ agent });
});

module.exports = {
    createReport,
    getAllReports,
    userByReport,
    deleteReport,
};
const FAQs = require("../model/FAQs.model");
const asyncWrapper = require("../../../middlewares/async");
const { StatusCodes } = require("http-status-codes");
const fileSizeFormatter = require('../../../utils/fileSize')

const createFAQs = async (req, res, next) => {
  try {
    let filesArray = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        filePath: element.path,
        fileType: element.mimetype,
        fileSize: fileSizeFormatter(element.size, 2),
      };
      filesArray.push(file);
    });
    console.log(filesArray);
    const faq = new FAQs({
        header: req.body.header,
        content: req.body.content,
        department: req.body.department,
        attachment: filesArray 
    });
    await faq.save();
    res.status(StatusCodes.CREATED).json(faq);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};

const updateFAQs = asyncWrapper(async (req, res) => {
  const { id: FAQsID } = req.params;

  const faq = await FAQs.findOneAndUpdate({ _id: FAQsID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!faq) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(`No FAQs with id : ${FAQsID}`);
  }
  res.status(StatusCodes.OK).json({ faq });
});

const deleteFAQs = asyncWrapper(async (req, res) => {
  const { id: FAQsID } = req.params;
  const faq = await FAQs.findOneAndDelete({ _id: FAQsID });
  if (!faq) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(`No FAQs with id : ${FAQsID}`);
  }
  res.status(StatusCodes.OK).json({ faq });
});

const getFAQs = asyncWrapper(async (req, res) => {
  const { id: FAQsID } = req.params;
  const faq = await FAQs.findOne({ _id: FAQsID });
  if (!faq) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(`No FAQs with id : ${FAQsID}`);
  }
  res.status(StatusCodes.OK).json({ faq });
});

const getAllFAQs = asyncWrapper(async (req, res) => {
  const faq = await FAQs.find().sort({ createdAt: "desc" }).exec();
  res.status(StatusCodes.OK).json({ faq });
});

module.exports = {
  getAllFAQs,
  getFAQs,
  createFAQs,
  updateFAQs,
  deleteFAQs,
};

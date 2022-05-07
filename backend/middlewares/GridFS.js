const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
require("dotenv").config();

var storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg", "image/jpg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-Ticket-${file.originalname}`;
      return filename;
    }
    return {
      bucketName: process.env.imgBucket,
      filename: `${Date.now()}-Ticket-${file.originalname}`
    };
  }
});
var uploadFiles = multer({ storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;
"use strict";
const multer = require("multer");

// FAQ

const FAQs = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/FAQs/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const FAQ_filter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/mkv" ||
    file.mimetype === "video/mpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadFAQs = multer({
  storage: FAQs,
  limits: {
    fileSize: 50 * 1024 * 1024 * 1024, //50MB max file(s) size
  },
  fileFilter: FAQ_filter,
});

// Ticket

const ticket = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/Tickets/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const ticketfilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadTicket = multer({
  storage: ticket,
  limits: {
    fileSize: 5 * 1024 * 1024 * 1024, //5MB max file(s) size
  },
  fileFilter: ticketfilter,
});

module.exports = { uploadTicket, uploadFAQs };

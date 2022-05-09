const User = require("../../users/Model/user.model");
const Admin = require("../../users/Model/user.model");
const Agent = require("../../users/Model/user.model");
const Ticket = require("../model/ticket.model");
const asyncWrapper = require("../../../middlewares/async");
const { StatusCodes } = require("http-status-codes");
const fileSizeFormatter = require("../../../utils/fileSize");
const {
  sendTicketConfirmation,
  sendTicketAssgin,
  sendTicketSolution,
  sendTicketUpdation,
} = require("../../../utils/Mails");
const fs = require("fs");

// this function for creating a ticket  =>
const createTicket = async (req, res, next) => {
  try {
    let filesArray = [];
    req.files.forEach((element) => {
      if (
        element.mimetype === "image/jpg" ||
        element.mimetype === "image/jpeg" ||
        element.mimetype === "image/png"
      ) {
        const file = {
          fileName: element.originalname,
          filePath: element.path,
          fileType: element.mimetype,
          fileSize: fileSizeFormatter(element.size, 2),
        };
        filesArray.push(file);
      }
    });
    console.log(filesArray);

    let voiceArray = [];
    req.files.forEach((elem) => {
      if (
        elem.mimetype === "audio/mpeg" ||
        elem.mimetype === "audio/mp3" ||
        elem.mimetype === "audio/webc"
      ) {
        const voice = {
          voiceName: elem.originalname,
          voicePath: elem.path,
          voiceType: elem.mimetype,
          voiceEncode: elem.encoding,
          voiceSize: fileSizeFormatter(elem.size, 2),
        };
        voiceArray.push(voice);
      }
    });
    console.log(voiceArray);

    const oneDay = 1000 * 60 * 60 * 24 * 1; // millisec * min * huor * day * how many days
    const priortyUpdation = new Date(Date.now() + oneDay);

    const { title, description, department, userID } = req.body;
    const ticket = await Ticket.create({
      title,
      description,
      department,
      user: userID,
      audioRecord: voiceArray,
      attachment: filesArray,
      ticketUpdatedTime: priortyUpdation,
    });

    let userTickets = await Ticket.find({ user: userID });

    const sendTicket = await User.findOneAndUpdate(
      { _id: userID },
      {
        createdTickets: [...userTickets],
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(StatusCodes.CREATED).json(ticket);
    //sendTicketConfirmation(User.name, User.email, req.body._id);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};

const assignTicket = async (req, res) => {
  const allowedUpdates = ["priorty", "status"];
  const keys = Object.keys(req.body);
  const isUpdationValid = keys.every((key) => allowedUpdates.includes(key));
  if (!isUpdationValid)
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(`You can only assign ${allowedUpdates}`);
  try {
    const { id: ticketID } = req.params;
    const ticket = await Ticket.findOneAndUpdate(
      {
        _id: ticketID,
      },
      { priorty: req.body.priorty, status: req.body.status },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!ticket)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(`No ticket with id : ${ticketID}`);
    res.status(StatusCodes.OK).json(ticket);
    //sendTicketSolution(User.name, User.email, req.body._id);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

const solveTicket = async (req, res) => {
  const allowedUpdates = ["solve", "agent"];
  const keys = Object.keys(req.body);
  const isUpdationValid = keys.every((key) => allowedUpdates.includes(key));
  if (!isUpdationValid)
    res.status(StatusCodes.BAD_REQUEST).json("You can only reply");
  try {
    const { id: ticketID } = req.params;
    const ticket = await Ticket.findOneAndUpdate(
      {
        _id: ticketID,
      },
      {
        $push: { solve: req.body.solve },
        status: "User-Reply",
        agent: req.body.agent,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!ticket)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(`No ticket with id : ${ticketID}`);
    res.status(StatusCodes.OK).json(ticket);
    //sendTicketSolution(User.name, User.email, req.body._id);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

const replyTicket = async (req, res) => {
  const allowedUpdates = ["reply"];
  const keys = Object.keys(req.body);
  const isUpdationValid = keys.every((key) => allowedUpdates.includes(key));
  if (!isUpdationValid)
    res.status(StatusCodes.BAD_REQUEST).json("You can only reply");
  try {
    const { id: ticketID } = req.params;
    const ticket = await Ticket.findOneAndUpdate(
      {
        _id: ticketID,
      },
      { $push: { reply: req.body.reply }, status: "In-Progress" },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!ticket)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(`No ticket with id : ${ticketID}`);
    res.status(StatusCodes.OK).json(ticket);
    //sendTicketSolution(User.name, User.email, req.body._id);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

const deleteTicket = asyncWrapper(async (req, res) => {
  const { id: ticketID } = req.params;
  const ticket = await Ticket.findOneAndDelete({ _id: ticketID });
  if (!ticket) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(`No ticket with id : ${ticketID}`);
  }
  res.status(StatusCodes.OK).json({ ticket });
});

const getTicket = asyncWrapper(async (req, res) => {
  const {
    user: { userId },
    params: { id: ticketID },
  } = req;
  const ticket = await Ticket.findOne({
    _id: ticketID,
    custID: userId,
  });
  if (!ticket) {
    throw new NotFoundError(`No Ticket with id ${ticketID}`);
  }
  res.status(StatusCodes.OK).json({ ticket });
});

const getAllTickets = asyncWrapper(async (req, res) => {
  const tickets = await Ticket.find({}, {}, { sort: { _id: -1 } }).exec();
  res.status(StatusCodes.OK).json({ tickets });
});

// Func that find tickets that been created by a user
const getMyTickts = asyncWrapper(async (req, res) => {
  const { id: userID } = req.params;

  let userTickets = await Ticket.find(
    { user: userID },
    {},
    { sort: { _id: -1 } }
  );

  if (!userTickets) {
    throw new NotFoundError(`No Ticket with user_id ${userTickets}`);
  }
  res.status(StatusCodes.OK).json({ userTickets, count: userTickets.length });
});

// const updateData = () => {
//   try {
//     const tickets = await Ticket.find({priorty, status: 'Pending', ticketUpdatedTime});
//     if(!tickets = )
//   } catch (error) {

//   }
// };

module.exports = {
  getAllTickets,
  getTicket,
  assignTicket,
  solveTicket,
  getMyTickts,
  createTicket,
  replyTicket,
  deleteTicket,
};

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
const { options } = require("../routes/ticket.routes");

// this function for creating a ticket  =>
const createTicket = async (req, res, next) => {
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

    const oneDay = 1000 * 60 * 60 * 24 * 1; // millisec * min * huor * day * how many days
    const priortyUpdation = new Date(Date.now() + oneDay);

    //const { id: userID } = req.params;
    const { title, description, department, userID, audioRecord } = req.body;
    const ticket = await Ticket.create({
      title,
      description,

      department,
      audioRecord,
      user: userID,
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

const replyTicket = async (req, res) => {
  const allowedUpdates = ["reply"];
  const keys = Object.keys(req.body);
  const isUpdationValid = keys.every((key) => allowedUpdates.includes(key));
  if (!isUpdationValid)
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(`You can only update ${allowedUpdates}`);

  try {
    const { id: ticketID } = req.params;
    const ticket = await Ticket.findOneAndUpdate(
      {
        _id: ticketID,
      },
      req.body,
      {
        new: true,
        runValidators: true,
        maxTimeMS: 2,
      }
    );
    if (!ticket)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(`No ticket with id : ${ticketID}`);

    res.status(StatusCodes.OK).json(ticket);
    //sendTicketUpdation(Agent.name, Agent.email, req.body._id);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error);
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
      req.body,

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
  const allowedUpdates = ["solve"];
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
      req.body,
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
  const tickets = await Ticket.find({}).sort({ createdAt: "desc" }).exec();
  res.status(StatusCodes.OK).json({ tickets });
});

// Func that find tickets that been created by a user
const getMyTickts = asyncWrapper(async (req, res) => {
  const { id: userID } = req.params;

  let userTickets = await Ticket.find({ user: userID });

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
  //test,
};

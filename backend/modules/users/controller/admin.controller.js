const Admin = require("../Model/user.model");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../../../middlewares/async");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const getAllAgents = async(req, res) => {
    const admins = await Admin.find({});
    // .select("-password");
    res.json({ message: "All agent", data: admins });
};

const agent_sign_up = async(req, res) => {
    let { name, last_name, department, email, password, role = "agent" } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (admin) {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "email is already exist" });
        } else {
            const employee = new Admin({ name, last_name, department, email, password, role });
            await employee.save();
            res.status(StatusCodes.CREATED).json({ message: "agent created" });
        }
    } catch (errors) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "error", ...errors });
    }

    // try {
    //   await User.insertMany({ name, email, age, password });
    //   res.json({ message: "registed success" });
    // } catch ({ errors }) {
    //   res.json({ message: "error", ...errors });
    // }
};

const agent_sign_in = asyncWrapper(async(req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "email is not found" });
    } else {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
            const token = jwt.sign({ _id: admin._id, role: admin.role }, process.env.SECRET_TOKEN, {
                expiresIn: "1h",
            });
            // var decoded = jwt.verify(token, 'shhhhh');

            res.status(StatusCodes.OK).json({
                message: "success",
                token,
                data: {
                    _id: admin._id,
                    email: admin.email,
                    role: admin.role,
                },
            });
        } else {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "incorrect password" });
        }
    }
});

const getAgent = asyncWrapper(async(req, res) => {
    let { id } = req.params;
    const admin = await Admin.findOne({ _id: id });
    res.json({ message: "success", admin });
});

const showCurrentUser = async(req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user });
};

const deleteAgent = asyncWrapper(async(req, res) => {
    let { id } = req.params;
    const admin = await Admin.deleteOne({ _id: id });
    res.json({ message: "deleted success", admin });
});

const updateAgentName = asyncWrapper(async(req, res) => {
    let { id } = req.params;
    let { name } = req.body;

    const admin = await Admin.updateOne({ _id: id }, { name: name });
    res.json({ message: "updated success", admin });
});

const updateAgentEmail = async(req, res) => {
    const { email, name } = req.body;
    if (!email || !name) {
        throw new CustomError.BadRequestError('Please provide all values');
    }
    const admin = await Admin.findOne({ _id: id });

    admin.email = email;
    admin.name = name;

    await admin.save();

    const tokenAdmin = createTokenUser(admin);
    attachCookiesToResponse({ res, admin: tokenAdmin });
    res.status(StatusCodes.OK).json({ admin: tokenAdmin });
};

const updateAgentPassword = async(req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide both values');
    }
    const admin = await Admin.findOne({ _id: id });

    const isPasswordCorrect = await admin.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    admin.password = newPassword;

    await admin.save();
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
};


module.exports = {
    getAllAgents,
    updateAgentPassword,
    updateAgentEmail,
    updateAgentName,
    showCurrentUser,
    agent_sign_up,
    getAgent,
    deleteAgent,
    agent_sign_in,
};
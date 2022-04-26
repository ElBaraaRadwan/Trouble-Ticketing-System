const User = require("../Model/user.model");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../../../middlewares/async");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const getAllUsers = async(req, res) => {
    const users = await User.find({}).select("-password");
    res.json({ message: "All users", data: users });
};

const showCurrentUser = async(req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user });
};

const sign_up = async(req, res) => {
    let { name, last_name, email, age, password, role = "user" } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "email is already exist" });
        } else {
            const customer = new User({ name, last_name, email, age, password, role });
            await customer.save();
            res.status(StatusCodes.CREATED).json({ message: "user created" });
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

const sign_in = asyncWrapper(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "email is not found" });
    } else {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_TOKEN, {
                expiresIn: "1h",
            });

            res.status(StatusCodes.OK).json({
                message: "success",
                token,
                data: {
                    _id: user._id,
                    email: user.email,
                    role: user.role,
                    department: user.department,
                },
            });
        } else {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "incorrect password" });
        }
    }
});

const getUser = asyncWrapper(async(req, res) => {
    let { id } = req.params;
    const user = await User.findOne({ _id: id });
    res.json({ message: "success", user });
});

const deleteUser = asyncWrapper(async(req, res) => {
    let { id } = req.params;
    const user = await User.deleteOne({ _id: id });
    res.json({ message: "deleted success", user });
});

const updateUserName = asyncWrapper(async(req, res) => {
    let { id } = req.params;
    let { name } = req.body;

    const user = await User.updateOne({ _id: id }, { name: name });
    res.json({ message: "updated success", user });
});

const updateUserEmail = async(req, res) => {
    const { email, name } = req.body;
    if (!email || !name) {
        throw new CustomError.BadRequestError('Please provide all values');
    }
    const user = await User.findOne({ _id: req.user.userId });

    user.email = email;
    user.name = name;

    await user.save();

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async(req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide both values');
    }
    const user = await User.findOne({ _id: req.user.userId });

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    user.password = newPassword;

    await user.save();
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
};

module.exports = {
    getAllUsers,
    showCurrentUser,
    sign_up,
    getUser,
    deleteUser,
    updateUserName,
    updateUserEmail,
    updateUserPassword,
    sign_in,
};
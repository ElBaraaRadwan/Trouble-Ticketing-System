// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema({
//     name: { type: String },
//     last_name: { type: String },
//     email: { type: String, required: true },
//     password: { type: String },
//     age: { type: Number, min: [6, "err min"] },
//     role: { type: String },
//     verified: { type: Boolean, default: false },
// }, {
//     timestamps: true,
// });

// userSchema.pre("save", async function(next) {
//     this.password = await bcrypt.hash(this.password, 8);
//     next();
// });

// const adminSchema = new mongoose.Schema({
//     name: { type: String },
//     last_name: { type: String },
//     department: { type: String },
//     email: { type: String, required: true },
//     password: { type: String },
//     role: { type: String },
//     verified: { type: Boolean, default: false },
// }, {
//     timestamps: true,
// });

// adminSchema.pre("save", async function(next) {
//     this.password = await bcrypt.hash(this.password, 8);
//     next();
// });

// module.exports = userSchema;
// module.exports = adminSchema;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide first name"],
    minlength: 3,
    maxlength: 25,
  },
  last_name: {
    type: String,
    required: [true, "Please provide last name"],
    minlength: 3,
    maxlength: 25,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  department: {
    type: String,
    enum: [
      "Sales",
      "Tech-Sup",
      "Devices-Com",
      "Devices-TV",
      "Devices-Mob",
      "Devices-Air",
      "None",
    ],
    default: "None",
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Date,
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
  createdTickets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
  }],
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = UserSchema;

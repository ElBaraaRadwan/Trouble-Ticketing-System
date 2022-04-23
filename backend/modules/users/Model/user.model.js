const mongoose = require("mongoose");
const userSchema = require("../Schema/user.schema");

const User = mongoose.model("Users", userSchema);


module.exports = User;
const mongoose = require("mongoose");
const userSchema = require("../Schema/user.schema");
const adminSchema = require("../Schema/user.schema");

<<<<<<< HEAD
const User = mongoose.model("User", userSchema);
=======
const Admin = mongoose.model("Admin", adminSchema);
const User = mongoose.model("Users", userSchema);
>>>>>>> 0d3c11f67022b2a5925179de52c801bf6fd6dcdd


module.exports = User;
module.exports = Admin;
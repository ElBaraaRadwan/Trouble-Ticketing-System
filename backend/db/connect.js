const mongoose = require("mongoose");

const connection = () => {
    const LOCAL_DB = 'mongodb://localhost:27017/ticket-system'
    return mongoose
        .connect(process.env.MONGODB_URI || LOCAL_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((result) => console.log("DB connected"))
        .catch((err) => console.log(err));
};

module.exports = connection;
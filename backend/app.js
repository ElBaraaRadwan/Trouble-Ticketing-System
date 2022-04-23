const express = require("express");
const connection = require("./db/connect");
require("dotenv").config();
const app = express();

// for uploading files
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes
const userRoute = require("./modules/users/routes/users.routes");
const ticketRoute = require("./modules/tickets/routes/ticket.routes");
const feedBackRoute = require("./modules/feedback/routes/feedback.routes");
const reportRoute = require("./modules/reports/routes/report.routes");
const FAQsRoute = require("./modules/FAQs/routes/FAQs.routes");

app.use(userRoute, ticketRoute, feedBackRoute, reportRoute, FAQsRoute);

// must be below the routes so the routes can work
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello World!"));

const start = async () => {
  try {
    // connectDB
    await connection();
    app.listen(port, () => {
      console.log(`Server running at => http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = app;

const cron = require("node-cron");

cron.schedule("0 0 * * *", () => {
  exports = function () {
    const mongodbAtlas = context.services.get("mongodb-atlas");
    const coreUsers = mongodbAtlas.db("TicketSystem").collection("users");
    const backupUsers = mongodbAtlas.db("BACKUP").collection("users");

    return coreUsers
      .find({}, { _id: 0 })
      .toArray()
      .then((resultList) => {
        if (resultList.length) {
          return backupUsers.insertMany(resultList);
        }
      });
  };

  exports = function () {
    const mongodbAtlas = context.services.get("mongodb-atlas");
    const coreTickets = mongodbAtlas.db("TicketSystem").collection("tickets");
    const backupTickets = mongodbAtlas.db("BACKUP").collection("tickets");

    return coreTickets
      .find({}, { _id: 0 })
      .sort({ status: "Solved" })
      .toArray()
      .then((resultList) => {
        if (resultList.length) {
          return backupTickets.insertMany(resultList);
        }
      });
  };

  exports = function () {
    const mongodbAtlas = context.services.get("mongodb-atlas");
    const coreReports = mongodbAtlas.db("TicketSystem").collection("reports");
    const backupReports = mongodbAtlas.db("BACKUP").collection("reports");

    return coreReports
      .find({}, { _id: 0 })
      .sort({ status: "Solved" })
      .toArray()
      .then((resultList) => {
        if (resultList.length) {
          return backupReports.insertMany(resultList);
        }
      });
  };
});

cron.schedule("* * 29 * *", () => {
  exports = function () {
    const mongodbAtlas = context.services.get("mongodb-atlas");
    const coreFeedbacks = mongodbAtlas
      .db("TicketSystem")
      .collection("feedbacks");
    const backupFeedbacks = mongodbAtlas.db("BACKUP").collection("feedbacks");

    return coreFeedbacks
      .find({}, { _id: 0 })
      .sort({ createAt })
      .toArray()
      .then((resultList) => {
        if (resultList.length) {
          return backupFeedbacks.insertMany(resultList);
        }
      });
  };

  exports = function () {
    const mongodbAtlas = context.services.get("mongodb-atlas");
    const coreFAQs = mongodbAtlas
      .db("TicketSystem")
      .collection("faqs");
    const backupFAQs = mongodbAtlas.db("BACKUP").collection("faqs");

    return coreFAQs
      .find({}, { _id: 0 })
      .sort({ createAt })
      .toArray()
      .then((resultList) => {
        if (resultList.length) {
          return backupFAQs.insertMany(resultList);
        }
      });
  };
});

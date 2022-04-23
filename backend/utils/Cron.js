const cron = require("node-cron");

exports = function () {
  const mongodbAtlas = context.services.get("mongodb-atlas");
  const coreUsers = mongodbAtlas.db("TicketSystem").collection(data[i]);
  const backupUsers = mongodbAtlas.db("BACKUP").collection(data[i]);

  return coreUsers
    .find({}, { _id: 0 })
    .toArray()
    .then((resultList) => {
      if (resultList.length) {
        return backupUsers.insertMany(resultList);
      }
    });
};

// cron.schedule("0 0 * * *", () => {
//   for (i=0;i<5;i++){
//     exports = backupData(i);
//   }

// });

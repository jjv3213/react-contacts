const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectToDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log("mongodb connected"))
    .catch(err => {
      console.log("failed: " + err.message);
      process.exit(1);
    });
};

module.exports = connectToDB;

const mongoose = require("mongoose");
const { MONGO_DB_USER, MONGO_DB_PASSWORD, MONGO_DB_HOST, MONGO_DB_DATABASE } = require("../contants/env");


const setUpDbConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}.mongodb.net/${MONGO_DB_DATABASE}`
    );
    console.log("Database connection successful");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = setUpDbConnection;

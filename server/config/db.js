const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const dotenv = require("dotenv");
dotenv.config();

const PASSWORD =  dotenv.PASSWORD;
const USERNAME = dotenv.USERNAME;

async function connectDatabase() {
  try {
    await mongoose.connect(
      `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.atctit0.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Connected to Database");
  } catch (error) {
    console.error("Could not connect to the database");
  }
}

module.exports = connectDatabase;

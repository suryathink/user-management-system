const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.set("strictQuery", true);

const PASSWORD = process.env.PASSWORD;
const USERNAME = process.env.USERNAME;

async function connectDatabase() {
  try {
    await mongoose.connect(
      `mongodb+srv://ShunyEka:${PASSWORD}@cluster0.vn1x1js.mongodb.net/`
    );
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
    console.error("Could not connect to the database");
  }
}

module.exports = connectDatabase;

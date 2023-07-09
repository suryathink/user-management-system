const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDatabase = require("./config/db");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

connectDatabase().then(() => {
  app.listen(3000, () =>
    console.log("Server listening on http://localhost:3000")
  );
});

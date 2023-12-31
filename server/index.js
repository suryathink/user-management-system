const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDatabase = require("./config/db");
const router = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use("/users", router);

connectDatabase().then(() => {
  app.listen(8080, () =>
    console.log("Server listening on http://localhost:8080")
  );
});

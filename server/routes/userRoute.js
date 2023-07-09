// const { Router } = require("express");
// const router = Router();
const express = require("express");

const User = require("../model/userSchema");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let users = await User.find();
    res.send({
      success: true,
      users: users,
    });
  } catch (error) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.send({
      data: user,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

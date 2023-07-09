const { Router } = require("express");

const User = require("../model/userSchema");

const router = Router();

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

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


router.post('/', async (req,res)=>{
    try {
        let {name,email,phone} = req.params;

        const user = await addUser({
            name,email,phone
        })

        return res.send({
            data:user
        })

    } catch (error) {
        res.status(500).send(error.message);
    }
})
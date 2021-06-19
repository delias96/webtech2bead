const Router = require("express-promise-router");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user.js");

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({});
    return;
  }

  const user = await User.findOne({ username });
  if (!user) {
    res.status(401).send({});
    return;
  }

  const passwordOk = await user.comparePassword(password);
  if (!passwordOk) {
    res.status(401).send({});
    return;
  }

  const accessToken = jwt.sign({ userId: user._id }, config.jwtSecret, {
    expiresIn: "1d",
  });
  res.send({ accessToken });
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({});
    return;
  }

  try {
    await User.create({ username, password });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).send({});
      return;
    }

    throw err;
  }

  res.send({});
});

module.exports = router;

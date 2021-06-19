const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const config = require("../config");
const User = require("../models/user");

const jwtVerifyAsync = promisify(jwt.verify);

const protected = async (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).send({});
    return;
  }

  const rawToken = authorization.split("Bearer ").pop();
  if (!rawToken) {
    res.status(401).send({});
    return;
  }

  try {
    const token = await jwtVerifyAsync(rawToken, config.jwtSecret);
    if (!token.userId) {
      throw Error("Missing userId.");
    }

    const user = await User.findById(token.userId);
    if (!user) {
      throw Error("User not found.");
    }
  } catch (err) {
    res.status(401).send({});
    return;
  }

  next();
};

module.exports = protected;

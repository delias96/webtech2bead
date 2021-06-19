const config = require("./config");
const mongoose = require("mongoose");

module.exports = async function () {
  const db = await mongoose.connect(config.mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return db;
};

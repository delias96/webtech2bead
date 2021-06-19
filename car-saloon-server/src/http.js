const express = require("express");
const cors = require("cors");
const config = require("./config");
const authController = require("./controllers/auth");
const carsController = require("./controllers/cars");

const app = express();

app.use(cors());
app.use(express.json());
app.use(authController);
app.use(carsController);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal server error");
});

module.exports = function startHttpServer() {
  return new Promise((resolve, reject) => {
    app.listen(config.port, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
};

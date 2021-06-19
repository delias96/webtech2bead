const config = require("./config");
const connectToDatabase = require("./db");
const startHttpServer = require("./http");

module.exports = async function () {
  await connectToDatabase();
  await startHttpServer();
  console.log(`Server is running on http://localhost:${config.port}!`);
};

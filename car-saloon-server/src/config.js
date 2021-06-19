module.exports = {
  port: process.env.PORT || "8080",
  mongodbUrl:
    process.env.MONGODB_CONNECTION_STRING ||
    "mongodb://localhost:27017/car-saloon",
  jwtSecret: process.env.JWT_SECRET || "default-jwt-secret",
};

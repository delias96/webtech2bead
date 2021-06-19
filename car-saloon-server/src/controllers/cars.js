const Router = require("express-promise-router");
const protected = require("../middlewares/protected");
const Car = require("../models/car.js");

const router = Router();

router.use(protected);

router.get("/cars", async (req, res) => {
  const cars = await Car.find();

  res.send(cars);
});

router.post("/cars", async (req, res) => {
  const {
    licensePlateNumber,
    brandName,
    modelName,
    fuelType,
    dateOfManufacture,
  } = req.body;

  try {
    await Car.create({
      licensePlateNumber,
      brandName,
      modelName,
      fuelType,
      dateOfManufacture,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({});
      return;
    }

    throw err;
  }

  res.send({});
});

router.get("/cars/:id", async (req, res) => {
  const car = await Car.findById(req.params.id);

  res.send(car);
});

router.post("/cars/:id", async (req, res) => {
  const {
    licensePlateNumber,
    brandName,
    modelName,
    fuelType,
    dateOfManufacture,
  } = req.body;

  const car = await Car.findById(req.params.id);
  Object.assign(car, {
    licensePlateNumber,
    brandName,
    modelName,
    fuelType,
    dateOfManufacture,
  });
  try {
    await car.save();
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({});
      return;
    }

    throw err;
  }

  res.send({});
});

router.delete("/cars/:id", async (req, res) => {
  await Car.deleteOne({ _id: req.params.id });

  res.send({});
});

module.exports = router;

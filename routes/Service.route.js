const router = require("express").Router();
const Service = require("../models/Service");

router.post("/", async (req, res) => {
  try {
    const { name, description, logo, link } = req.body;

    const newService = new Service({
      name,
      description,
      logo,
      link
    });

    const savedService = await newService.save();

    res.json(savedService);
    console.log("Service added");

  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    console.log("Service loaded succesfully");
    res.json(services);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

module.exports = router;
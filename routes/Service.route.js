let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Service Model
let serviceSchema = require("../models/Service");

// Create Service
router.route("/").post((req, res) => {
  serviceSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
      console.log('Service added');
    }
  });
});

// READ Services
router.route("/").get((req, res) => {
  serviceSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Single Service
router.route("/:id").get((req, res) => {
  serviceSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Service
router.route("/:id").put((req, res, next) => {
  serviceSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Service updated successfully !");
      }
    }
  );
});

// Delete Service
router.route("/:id").delete((req, res, next) => {
  serviceSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;

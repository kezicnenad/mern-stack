import mongoose from 'mongoose'
import { StaticSchema } from '../models/staticModel.js'
import jwt from 'jsonwebtoken'

const Static = mongoose.model("Static", StaticSchema);

export const dodajNoviStatic = (req, res) => {
  let noviStatic = new Static(req.body);

  noviStatic.save((err, sTatic) => {
    if (err) {
      res.send(err);
    }
    const token = jwt.sign({ sTatic }, process.env.TOKEN_SECRET);
    res.json({ token: token });
    console.log("Static unešen");
  });
};

export const dohvatiStatic = (req, res) => {
  Static.find({}, (err, sTatic) => {
    if (err) {
      res.send(err);
    }
    res.json(sTatic);
    console.log("Statici učitani");
  });
};

export const dohvatiJedanStatic = (req, res) => {
  Static.findById(req.params.id, (err, sTatic) => {
    if (err) {
      res.send(err);
    }
    res.json(sTatic);
    console.log("Static učitan");
  });
};

export const updateJedanStatic = (req, res) => {
  Static.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, useFindAndModify: false },
    (err, sTatic) => {
      if (err) {
        res.send(err);
      }
      res.json(req.body);
      console.log("Static uređen");
    }
  );
};

export const izbrisiJedanStatic = (req, res) => {
  Static.deleteOne({ _id: req.params.id }, (err, sTatic) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Static obrisan" });
    console.log("Static obrisan");
  });
};
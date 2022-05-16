import mongoose from 'mongoose'
import { ApartmanSchema } from '../models/apartmanModel.js'
import jwt from 'jsonwebtoken'

const Apartman = mongoose.model("Apartman", ApartmanSchema);

export const dodajNoviApartman = (req, res) => {
  let noviApartman = new Apartman(req.body);

  noviApartman.save((err, apartman) => {
    if (err) {
      res.send(err);
    }
    const token = jwt.sign({ apartman }, process.env.TOKEN_SECRET);
    res.json({ token: token });
    console.log("Apartman unešen");
  });
};

export const dohvatiApartmane = (req, res) => {
  Apartman.find({}, (err, apartman) => {
    if (err) {
      res.send(err);
    }
    res.json(apartman);
    console.log("Apartmani učitani");
  });
};

export const dohvatiApartmaneOcjenaVecaOdCetri = (req, res) => {
  Apartman.find({ ocjena: { $gt: 4 } }, (err, apartman) => {
    if (err) {
      res.send(err);
    }
    res.json(apartman);
    console.log("Apartmani učitani");
  });
};

export const dohvatiApartmaneIzMjesta = (req, res) => {
  Apartman.find({ postanski_broj: { $eq: req.params.postanskiBroj } }, (err, apartman) => {
    if (err) {
      res.send(err);
    }
    res.json(apartman);
    console.log("Apartmani učitani");
  });
};

export const dohvatiApartman = (req, res) => {
  Apartman.findById(req.params.id, (err, apartman) => {
    if (err) {
      res.send(err);
    }
    res.json(apartman);
    console.log("Apartman učitan");
  });
};

export const updateApartman = (req, res) => {
  Apartman.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, useFindAndModify: false },
    (err, apartman) => {
      if (err) {
        res.send(err);
      }
      res.json(req.body);
      console.log("Apartman uređen");
    }
  );
};

export const izbrisiApartman = (req, res) => {
  Apartman.deleteOne({ _id: req.params.id }, (err, apartman) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Apartman obrisan" });
    console.log("Apartman obrisan");
  });
};
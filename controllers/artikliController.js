import mongoose from 'mongoose'
import { ArtiklSchema } from '../models/__exampleModel.js'
import jwt from 'jsonwebtoken'

const Artikl = mongoose.model("Artikl", ArtiklSchema);

export const dodajNoviArtikl = (req, res) => {
  let noviArtikl = new Artikl(req.body);

  noviArtikl.save((err, artikl) => {
    if (err) {
      res.send(err);
    }
    const token = jwt.sign({ artikl }, process.env.TOKEN_SECRET);
    res.json({ token: token });
    console.log("Artikl unešen");
  });
};

export const dohvatiArtikle = (req, res) => {
  Artikl.find({}, (err, artikl) => {
    if (err) {
      res.send(err);
    }
    res.json(artikl);
    console.log("Artikli učitani");
  });
};

export const dohvatiJedanArtikl = (req, res) => {
  Artikl.findById(req.params.id, (err, artikl) => {
    if (err) {
      res.send(err);
    }
    res.json(artikl);
    console.log("Artikl učitan");
  });
};

export const updateJedanArtikl = (req, res) => {
  Artikl.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, useFindAndModify: false },
    (err, artikl) => {
      if (err) {
        res.send(err);
      }
      res.json(req.body);
      console.log("Artikl uređen");
    }
  );
};

export const izbrisiJedanArtikl = (req, res) => {
  Artikl.deleteOne({ _id: req.params.id }, (err, artikl) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Artikl obrisan" });
    console.log("Artikl obrisan");
  });
};
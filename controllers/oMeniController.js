import mongoose from 'mongoose'
import { OMeniSchema } from '../models/oMeniModel.js'
import jwt from 'jsonwebtoken'

const OMeni = mongoose.model("OMeni", OMeniSchema);

export const dodajNoviOMeni = (req, res) => {
  let noviOMeni = new OMeni(req.body);

  noviOMeni.save((err, oMeni) => {
    if (err) {
      res.send(err);
    }
    const token = jwt.sign({ oMeni }, process.env.TOKEN_SECRET);
    res.json({ token: token });
    console.log("OMeni unešen");
  });
};

export const dohvatiOMenie = (req, res) => {
  OMeni.find({}, (err, oMeni) => {
    if (err) {
      res.send(err);
    }
    res.json(oMeni);
    console.log("OMenii učitani");
  });
};

export const dohvatiOMenieOcjenaVecaOdTri = (req, res) => {
  OMeni.find({ ocjena: { $gt: 3 } }, (err, oMeni) => {
    if (err) {
      res.send(err);
    }
    res.json(oMeni);
    console.log("OMenii učitani");
  });
};

export const dohvatiOMenieIzMjesta = (req, res) => {
  OMeni.find({ postanski_broj: { $eq: req.params.postanskiBroj } }, (err, oMeni) => {
    if (err) {
      res.send(err);
    }
    res.json(oMeni);
    console.log("OMenii učitani");
  });
};

export const dohvatiOMeni = (req, res) => {
  OMeni.findById(req.params.id, (err, oMeni) => {
    if (err) {
      res.send(err);
    }
    res.json(oMeni);
    console.log("OMeni učitan");
  });
};

export const updateOMeni = (req, res) => {
  OMeni.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, useFindAndModify: false },
    (err, oMeni) => {
      if (err) {
        res.send(err);
      }
      res.json(req.body);
      console.log("OMeni uređen");
    }
  );
};

export const izbrisiOMeni = (req, res) => {
  OMeni.deleteOne({ _id: req.params.id }, (err, oMeni) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "OMeni obrisan" });
    console.log("OMeni obrisan");
  });
};
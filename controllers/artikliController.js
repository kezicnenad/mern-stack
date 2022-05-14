import mongoose from 'mongoose';
import { ArtiklSchema } from '../models/artikliModel';

const Artikl = mongoose.model('Artikl', ArtiklSchema);

export const dodajNoviArtikl = (req, res) => {
  let noviArtikl = new Artikl(req.body);

  noviArtikl.save((err, artikl) => {
    if (err) {
      res.send(err);
    }
    res.json(artikl);
  });
};

export const dohvatiArtikle = (req, res) => {
  Artikl.find({}, (err, artikl) => {
    if (err) {
      res.send(err);
    }
    res.json(artikl);
  });
};

export const dohvatiJedanArtikl = (req, res) => {
  Artikl.findById(req.params.id, (err, artikl) => {
    if (err) {
      res.send(err);
    }
    res.json(artikl);
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
      res.json(artikl);
    }
  );
};

export const izbrisiJedanArtikl = (req, res) => {
  Artikl.remove(
    { _id: req.params.id },
    (err, artikl) => {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Artikl uspješno obrisan'});
    }
  );
};
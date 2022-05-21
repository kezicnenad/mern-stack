import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ArtiklSchema = new Schema({
  naziv: {
    type: String,
    required: "Unesi naziv",
  },
  opis: {
    type: String,
    required: "Unesi opis",
  },
  slika: {
    type: String,
    required: "Unesi sliku",
  },
  kolicina: {
    type: Number,
    required: "Unesi kolicinu",
  },
  cijena: {
    type: Number,
    required: "Unesi cijenu",
  }
});
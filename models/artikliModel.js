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
  kategorija: {
    type: Number,
    required: "Unesi kategoriju",
  },
  jedinica_mjere: {
    type: String,
    required: "Unesi jedinicu mjere",
  },
  cijena: {
    type: Number,
    required: "Unesi cijenu",
  },
  zaliha: {
    type: Number,
    required: "Unesi zalihe",
  },
  porez: {
    type: Number,
    required: "Unesi porez",
  },
  popust: {
    type: Number,
  },
  kreirano: {
    type: Date,
    default: Date.now
  }
});
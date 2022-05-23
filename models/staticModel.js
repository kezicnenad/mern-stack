import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const StaticSchema = new Schema({
  kategorija: {
    type: String,
    required: "Unesi kategoriju",
  },
  naslov: {
    type: String,
    required: "Unesi naziv",
  },
  opis: {
    type: String,
    required: "Unesi opis",
  },
  usluge: [{ kategorija: String, naziv: String, opis: String, slika: String }],
});
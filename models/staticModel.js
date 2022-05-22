import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const StaticSchema = new Schema({
  kategorija: {
    type: String,
    required: "Unesi kategoriju",
  },
  naziv: {
    type: String,
    required: "Unesi naziv",
  },
  opis: {
    type: String,
    required: "Unesi opis",
  },
  usluge: [{ naziv: String, opis: String, ikona: String }],
});
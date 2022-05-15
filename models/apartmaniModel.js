import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ApartmanSchema = new Schema({
  naziv: {
    type: String,
    required: "Unesi naziv",
  },
  vlasnik: {
    type: String,
    required: "Unesi vlasnika",
  },
  postanski_broj: {
    type: Number,
    required: "Unesi broj pošte",
  },
  mjesto: {
    type: String,
    required: "Unesi mjesto",
  },
  adresa: {
    type: String,
    required: "Unesi adresu",
  },
  opis: {
    type: String,
    required: "Unesi vlasnika",
  },
  telefon: {
    type: Number,
    required: "Unesi vlasnika",
  },
  mail: {
    type: String,
    required: "Unesi mail",
  },
  web: {
    type: String,
    required: "Unesi web adresu",
  },
  zvjezdice: {
    type: Number,
    required: "Unesi broj zvjezdica",
  },
  ocjena: {
    type: Number,
    required: "Unesi ocjenu",
  },
  povrsina: {
    type: Number,
    required: "Unesi povrsinu",
  },
  broj_soba: {
    type: Number,
    required: "Unesi broj soba",
  },
  broj_kreveta: {
    type: Number,
    required: "Unesi broj kreveta",
  },
  kuhinja: {
    type: Boolean,
    required: "Kuhinja",
  },
  perilica: {
    type: Boolean,
    required: "Perilica",
  },
  parking: {
    type: Boolean,
    required: "Parking",
  },
  wifi: {
    type: Boolean,
    required: "WiFi",
  },
  ljubimci: {
    type: Boolean,
    required: "Ljubimci",
  },
  etaza: {
    type: Number,
    required: "Unesi etažu",
  },
  dizalo: {
    type: Boolean,
    required: "Dizalo",
  },
  galerija: {
    type: Number,
    required: "Unesi galeriju",
  },
  blizina: {
    type: Number,
    required: "Unesi objekte u blizini",
  },
  recenzije: {
    type: Number,
    required: "Unesi recenziju",
  },
});
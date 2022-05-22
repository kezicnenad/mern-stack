import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const OMeniSchema = new Schema({
  ime: {
    type: String,
    required: "Unesi ime",
  },
  mail: {
    type: String,
    required: "Unesi mail",
  },
  telefon: {
    type: String,
    required: "Unesi telefon",
  },
  url: {
    type: String,
    required: "Unesi url",
  },
  github: {
    type: String,
    required: "Unesi GitHub",
  },
  linkedin: {
    type: String,
    required: "Unesi linkedIn",
  },
  zanimanje: {
    type: String,
    required: "Unesi zanimanje",
  },
  o_meni: {
    type: String,
    required: "Unesi o meni",
  },
  slika: {
    type: String,
    required: "Unesi sliku",
  }
});
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Int32 = require('mongoose-int32');

// Create Schema
const DogSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  OwnerID: {
    type: Int32,
    required: true
  },
  Bio: {
    type: String,
  },
  Pictures: {
    type: [],
    required: true
  },
  Breed: {
    type: String,
    required: true
  },
  Weight: {
    type: Int32,
    required: true
  },
  Height: {
    type: Int32,
    required: true
  },
  Age: {
    type: String,
    required: true
  },
  Sex: {
    type: String,
    required: true
  },
  PottyTrained: {
    type: Int32,
    required: true
  },
  Fixed: {
    type: Int32,
    required: true
  },
  DogID: {
    type: String,
    required: true
  }
});

module.exports = dog = mongoose.model("Dogs", DogSchema);

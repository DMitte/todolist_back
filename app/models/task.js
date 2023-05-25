const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    min: 2,
    max: 255,
  },
  description: {
    type: String,
    require: false,
    max: 2000,
  },
  datet: {
    type: Date,
    require: true,
  },
  timet: {
    type: String,
    require: true,
  },
  complete: {
    type: Boolean,
    require: false,
    default: false,
  },
  idperson: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);

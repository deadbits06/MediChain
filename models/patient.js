var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
firstName:  String,
contactNumber: Number,
});

module.exports = mongoose.model("patient",PatientSchema);

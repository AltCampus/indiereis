var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timestamp = require('time-stamp');

var dataSchema = new Schema({
	
}, {timestamps: true});


var Data = mongoose.model("Data", dataSchema);

module.exports = Data;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timestamp = require('time-stamp');

var dataSchema = new Schema({
	questions : [{
		type: Object,
		default: ""
	}],
	answers: [{
		type: Object,
		default: ""
	}],

	comments: {
		type: String,
		default: ""
	}

}, {timestamps: true});


var Data = mongoose.model("Data", dataSchema);

module.exports = Data;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timestamp = require('time-stamp');

var countrySchema = new Schema({
	name: {
		type: String,
		min: 3,
		max: 16,
		required: true,
	},
	photo: {
		type: String,
		default: ""
	}
}, {timestamps: true});


var Country = mongoose.model("Country", countrySchema);

module.exports = Country;
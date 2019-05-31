var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timestamp = require('time-stamp');

var countrySchema = new Schema({
	country: {
		type: Object,
		default: null
	}
},{ timestamps: true });

var Country = mongoose.model("Country", countrySchema);

module.exports = Country;
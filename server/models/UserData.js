var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timestamp = require('time-stamp');

var userDataSchema = new Schema({
	data:{
		country: {
			type: String,
			default: null
		},
		kindOfTrip: {
			type: String,
			default: null
		},
		tripinfo: {
			type: String,
			default: null
		},
		visacost: {
			type: String,
			default: null
		},
		numberofDays: {
			type: String,
			default: null
		},
		kindOfTrip: {
			type: String,
			default: null
		},
		vegAvailability: {
			type: String,
			default: null
		},
		indianFoodOption: {
			type: String,
			default: null
		},
		streetFood: {
			type: String,
			default: null
		},
		visaProcess: {
			type: String,
			default: null
		},
		travelInfo: {
			type: String,
			default: null
		},
		todoCountry: {
			type: String,
			default: null
		},
		peopleFriendly: {
			type: String,
			default: null
		},
		actvities: {
			type: String,
			default: null
		},
		nightLife: {
			type: String,
			default: null
		},
		safeTotravel: {
			type: String,
			default: null
		},
		Infra: {
			type: String,
			default: null
		},
		language: {
			type: String,
			default: null
		},
		wifi: {
			type: String,
			default: null
		},
		dayNight: {
			type: String,
			default: null
		},
		
		visaDays: {
			type: String,
			default: null
		},
		suitedFor: {
			type: String,
			default: null
		},
		typeOfHoliday: {
			type: String,
			default: null
		},
		tripExperience: {
			type: String,
			default: null
		},
	}
}, {timestamps: true});


var UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;
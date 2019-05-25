var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timestamp = require('time-stamp');

var userDataSchema = new Schema({
	country: {
		type: String,
		default: null
	},
	tripInfo: {
		type: String,
		default: null
	},
	visaTime:{
		type: String,
		default: null
	},
	bestTripFor: {
		type: String,
		default: null
	},
	holidayType: {
		type: String,
		default: null
	},
	vegetarianFoodRatings: {
		type: Number,
		default: 0
	},
	indianFoodAvailibility: {
		type: Number,
		default: 0
	},
	streetFoodAvailibility: {
		type: Number,
		default: 0
	},
	visaProcessRatings: {
		type: Number,
		default: 0
	},
	peopleFriendlyRatings: {
		type: Number,
		default: 0
	},
	obtainingInformationRatings: {
		type: Number,
		default: 0
	},
	plentyToDoRatings: {
		type: Number,
		default: 0
	},
	varietyOfActivitiesRatings: {
		type: Number,
		default: 0
	},
	nighttimeActivitiesRatings: {
		type: Number,
		default: 0
	},
	safetyRatings: {
		type: Number,
		default: 0
	},
	womenSaftyRatings:{
		type: Number,
		default: 0
	},
	infrastructureRatings: {
		type: Number,
		default: 0
	},
	englishCommunicationRatings:{
		type: Number,
		default: 0
	},
	wifiRatings:{
		type: Number,
		default: 0
	},
	"24/7serviseRatings":{
		type: Number,
		default: 0
	},
	tripDuration: {
		type: Number,
		default: 0
	},
	tripCost:{
		type: Number,
		default: 0
	},
	visaCost:{
		type: Number,
		default: 0
	},
	tripExperience: {
		type: String,
		default: ""
	},
	userId: {
		type: String,
		default: null
	},
	photos: {
		type: String,
		default: null
	}
}, {timestamps: true});


var UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;
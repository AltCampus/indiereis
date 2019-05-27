var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timestamp = require('time-stamp');

var questionSchema = new Schema({
	qset1: {
		type: Object,
		default: null
	},
	qset2: {
		type: Object,
		default: null
	},
	qset3: {
		type: Object,
		default: null
	},
	qset4: {
		type: Object,
		default: null
	},
}, {timestamps: true});


var Question = mongoose.model("Question", questionSchema);

module.exports = Question;
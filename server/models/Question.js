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
	options: [{
		type: String,
	}],
	// userData : [{
	// 	type: Object,
	// 	default: ""
	// }],
	// answers: {
	// 	type: String,
	// 	default: ""
	// },
	// options: {
	// 	type: String,
	// 	default: ""
	// },
	// comments: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: "Comment"
	// },
	// filterOptions: {
	// 	type: String,
	// 	default: ""
	// },
}, {timestamps: true});


var Question = mongoose.model("Question", questionSchema);

module.exports = Question;
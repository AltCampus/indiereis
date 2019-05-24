var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timestamp = require('time-stamp');

var questionSchema = new Schema({
	// userData : [{
	// 	type: Object,
	// 	default: ""
	// }],
	questions: [{
		type: String,
		default: null
	}],
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
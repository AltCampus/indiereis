var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timestamp = require('time-stamp');
var bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

var userSchema = new Schema({
	name: {
		type: String,
		min: 3,
		max: 16,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		min: 8,
		max: 20,
		required: true,
	},
	photo: {
		type: String,
		default: ""
	}
}, {timestamps: true});

userSchema.pre('save', function (next) {
  if (this.password) {
     this.password = bcrypt.hashSync(this.password, salt)
  }
  next()
})

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}


var User = mongoose.model("User", userSchema);

module.exports = User;
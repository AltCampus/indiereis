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
		unique: true,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		min: 6,
		max: 20,
		required: true,
	},
	photo: {
		type: String,
		default: ""
	},
	verified: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	token: {
		type: String,
		default: ""
	}
}, {timestamps: true});

userSchema.pre('save', function (next) {
  if (this.email === process.env.email || process.env.admin1) {
		this.isAdmin = true;
  }
  next();
});

userSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
     this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync( password, this.password );
};


var User = mongoose.model("User", userSchema);

module.exports = User;
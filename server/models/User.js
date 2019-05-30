var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timestamp = require('time-stamp');
var bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

var userSchema = new Schema({
	firstName:{
		type: String,
		default: ""
	},
	lastName:{
		type: String,
		default: ""
	},
	phoneNumber:{
		type: Number,
		default: null,
		unique: true
	},
	dob:{
		type: String,
		default: ""
	},
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
		min: 6,
		max: 20,
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
	userData: [{
		type: Schema.Types.ObjectId,
		ref: "UserData",
	}],
	token: {
		type: String,
		default: ""
	},
	strategies:[{
		type: String,
	}],
	google:{
		name: {
			type: String,
			default: ""
		},
	},
}, {timestamps: true});

userSchema.pre('save', function (next) {
  if(this.password && this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, salt);
  }
  if(this.email === process.env.EMAIL || this.email === process.env.ADMIN ){
		console.log('check3...');
		this.isAdmin = true
	} 
  next();
});

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync( password, this.password );
};

var User = mongoose.model("User", userSchema);

module.exports = User;
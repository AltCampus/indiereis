const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: Number,
      default: null,
      min: 10,
      max: 10,
    },
    dob: {
      type: String,
      default: "",
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
      default: "",
    },
    photo: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    userData: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserData",
      },
    ],
    token: {
      type: String,
      default: "",
    },
    strategies: [
      {
        type: String,
        default: "local",
      },
    ],
    google: {
      name: {
        type: String,
        default: "",
      },
      photo: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, salt);
  }
  if (this.email === process.env.EMAIL || this.email === process.env.ADMIN) {
    console.log("check3...");
    this.isAdmin = true;
    this.verified = true;
  }
  next();
});

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

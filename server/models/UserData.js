const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDataSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    country: {
      type: String,
      default: null,
    },
    kindOfTrip: {
      type: String,
      default: null,
    },
    terms: {
      type: String,
      default: null,
    },
    "Total traveling cost": {
      type: String,
      default: null,
    },
    "Total visa cost": {
      type: String,
      default: null,
    },
    "Trip duration": {
      type: String,
      default: null,
    },
    "veg food availability": {
      type: String,
      default: null,
    },
    "indian food options": {
      type: String,
      default: null,
    },
    "street food options": {
      type: String,
      default: null,
    },
    "overall visa process": {
      type: String,
      default: null,
    },
    "traveling and knowing the country": {
      type: String,
      default: null,
    },
    "todo options": {
      type: String,
      default: null,
    },
    "people friendly": {
      type: String,
      default: null,
    },
    "places to explore": {
      type: String,
      default: null,
    },
    "nighttime activities": {
      type: String,
      default: null,
    },
    "safe to travel": {
      type: String,
      default: null,
    },
    "safe to travel for women": {
      type: String,
      default: null,
    },
    infrastructure: {
      type: String,
      default: null,
    },
    "english communication": {
      type: String,
      default: null,
    },
    "wifi availability": {
      type: String,
      default: null,
    },
    "24/7 service": {
      type: String,
      default: null,
    },
    "trip experience": {
      type: String,
      default: null,
    },
    "visa application process time": {
      type: String,
      default: null,
    },
    "countyname best suited for": {
      type: String,
      default: null,
    },
    "ideal holiday": {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;

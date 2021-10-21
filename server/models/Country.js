const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countrySchema = new Schema(
  {
    country: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true }
);

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    qset1: {
      type: Object,
      default: null,
    },
    qset2: {
      type: Object,
      default: null,
    },
    qset3: {
      type: Object,
      default: null,
    },
    qset4: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;

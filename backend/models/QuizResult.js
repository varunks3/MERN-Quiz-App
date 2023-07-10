const mongoose = require("mongoose");

const QuizResultSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  myanswers: [
    {
      sino: {
        type: Number,
        required: true,
      },
      ans: {
        type: [String],
        required: true,
      },
    },
  ],
  score: {
    type: Number,
    default: 0
  },
});

const QuizResult = mongoose.model("QuizResult", QuizResultSchema);

module.exports = QuizResult;

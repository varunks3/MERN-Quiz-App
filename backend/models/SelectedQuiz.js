const mongoose = require('mongoose');

const SelectedQuizSchema = new mongoose.Schema({
  title: {type:String,
    unique:true},
  questions: [{
      sino:{
        type: Number,
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      options: { 
        type: [String],
        required: true,
      },
      answers: {
        type: [String], 
        required: true,
      },
    }
  ],
});


const SelectedQuiz = mongoose.model('SelectedQuiz', SelectedQuizSchema);

module.exports = SelectedQuiz;

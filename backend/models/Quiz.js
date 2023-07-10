const mongoose = require('mongoose');

const CreateQuiz = new mongoose.Schema({
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


const Quiz = mongoose.model('Quiz', CreateQuiz);

module.exports = Quiz;

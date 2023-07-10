const express = require("express");
const router = express.Router();
const SelectedQuiz = require("../models/SelectedQuiz");
const QuizResult = require("../models/QuizResult");


router.post("/takequiz", async (req, res) => {
    const dataArray = await SelectedQuiz.find();
    const data = dataArray[0];
    try {
      const { email, myanswers } = req.body;
      const result = new QuizResult({
        email,
        myanswers,
      });
      await result.save();
      const quizarray = await SelectedQuiz.find();
      const questionDoc = quizarray[0];
      const quizresultarray = await QuizResult.find();

      for (let i = 0; i < quizresultarray.length; i++) {
        let score = 0;
        const quizResult = quizresultarray[i];
  
        for (let j = 0; j < quizResult.myanswers.length; j++) {
          const myAnswer = quizResult.myanswers[j];
          const question = questionDoc.questions.find(
            (q) => q.sino === myAnswer.sino
          );
  
          if (arraysAreEqual(myAnswer.ans, question.answers)) {
            score++;
          }
        }
        quizResult.score = score;
        await quizResult.save();
      }
      function arraysAreEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
          return false;
        }
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) {
            return false;
          }
        }
        return true;
      }
      const mdata = await QuizResult.findOne({ email: email });
      const score = mdata.score;
      console.log(score);
      res.json(data);
    } catch (error) {
      return res.json(data);
    }
  });

module.exports = router;

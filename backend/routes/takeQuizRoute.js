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
        else if (arr1.toString !== arr2.toString){
          return false;
        }
        return true;
      }
      const mdata = await QuizResult.findOne({ email: email });
      const total = myanswers.length
      const score = mdata.score;
      let resdata = {data,score,total}
      // console.log({data,score})
      res.json(resdata);
    } catch (error) {
      console.log("catch")
      return res.json({data});
    }
  });

module.exports = router;

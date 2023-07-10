const express = require("express");
const Quiz = require("../models/Quiz");
const router = express.Router();


// get all the quizzes
router.get("/quizzes", async (req, res) => {
    try {
      const questions = await Quiz.find();
      return res.status(200).json(questions);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });
  
// get one quiz
router.post("/quiz/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const question = await Quiz.findOne({ _id: id });
      if (!question) {
        res.status(404).send("Quiz not found");
        return;
      }
      res.send(question);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
    try {
    } catch (error) {}
  });
  // get one quiz question
  // router.get("/question/:id", async (req, res) => {
  //   try {
  //     const id = req.params.id;
  //     const question = await Quiz.findOne({ "questions.sino": id });
  //     if (!question) {
  //       res.status(404).send("Question not found");
  //       return;
  //     }
  //     res.send(question);
  //   } catch (error) {
  //     return res.status(500).json({ error: error });
  //   }
  // });

module.exports = router;

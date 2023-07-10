const express = require("express");
const router = express.Router();
const QuizResult = require("../models/QuizResult");

router.get("/users-score", async (req, res) => {
    try {
      const quizresults = await QuizResult.find();
      if (!quizresults) {
        res.status(404).send("scores not found");
        return;
      }
      res.send(quizresults);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });

  module.exports = router;

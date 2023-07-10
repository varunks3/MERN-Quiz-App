const express = require("express");
const Quiz = require("../models/Quiz");
const router = express.Router();


// create quiz
router.post("/createquiz", async (req, res) => {
    try {
      const { title, questions } = req.body;
      const quiz = new Quiz({
        title,
        questions,
      });
      await quiz.save();
      res.status(200).json({ message: "created quiz" });
    } catch (error) {
      console.log(error);
      res.status(555).json({ message: "error" });
    }
  });

module.exports = router;

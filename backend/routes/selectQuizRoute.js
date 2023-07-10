const express = require("express");
const Quiz = require("../models/Quiz");
const router = express.Router();
const SelectedQuiz = require("../models/SelectedQuiz");

// select quiz
router.post("/selectedquiz", async (req, res) => {
    try {
      const { id } = req.body;
      const dataArray = await Quiz.find({ _id: id });
      const data = dataArray[0];
      const newRecord = new SelectedQuiz({
        title: data.title,
        questions: data.questions,
      });
      await SelectedQuiz.deleteMany();
      await newRecord.save();
      const newData = SelectedQuiz.find();
      res.status(200).json({ id });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });
  

module.exports = router;

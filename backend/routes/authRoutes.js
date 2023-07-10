const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Quiz = require("../models/Quiz");
const router = express.Router();
const auth = require("../auth");
const Participant = require("../models/Participant");
const SelectedQuiz = require("../models/SelectedQuiz");
const QuizResult = require("../models/QuizResult");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
    });
    // Save the user to the database
    await user.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});
router.get("/quiz", (req, res) => {
  res.send("GET Request Called");
});
router.get("/login", async (req, res) => {});
// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = jwt.sign(
      { email: user.email },
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      {
        expiresIn: "1h",
      }
    );
    // redirect('/createquiz')
    // res.redirect('/auth')
    res.status(200).send({
      message: "Login Successful",
      email: user.email,
      token,
    });
    // res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});
router.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

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
router.get("/quiz/:id", async (req, res) => {
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
});
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
// Participant Register route
router.post("/participantsignup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const participant = new Participant({
      email,
      password: hashedPassword,
    });
    // Save the user to the database
    await participant.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});
// Login route
router.post("/participantlogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const participant = await Participant.findOne({ email });
    if (!participant) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, participant.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const mytoken = jwt.sign(
      { email: participant.email },
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).send({
      message: "Login Successful",
      email: participant.email,
      mytoken,
    });
    // res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});
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
    // Iterate over each object in quizresultarray
    for (let i = 0; i < quizresultarray.length; i++) {
      let score = 0;
      const quizResult = quizresultarray[i];

      // Iterate over each answer object in myanswers array
      for (let j = 0; j < quizResult.myanswers.length; j++) {
        const myAnswer = quizResult.myanswers[j];
        const question = questionDoc.questions.find(
          (q) => q.sino === myAnswer.sino
        );

        // Compare the ans array to the corresponding answers array
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
router.get("/userscores", async (req, res) => {
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
router.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});
// Curb Cores Error by adding a header here
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
module.exports = router;

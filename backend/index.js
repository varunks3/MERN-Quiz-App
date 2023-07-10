const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require('./routes/authRoutes');
const createQuizRoute = require('./routes/createQuizRoute');
const getQuiz = require('./routes/getQuiz');
const selectQuizRoute = require('./routes/selectQuizRoute');
const takeQuizRoute = require('./routes/takeQuizRoute');
const usersScoreRoute = require('./routes/usersScoreRoute');



app.use(express.json());
const uri =  "mongodb+srv://varunsbhat3:Sv%40dM4evR@cluster0.hbz9t1b.mongodb.net/?retryWrites=true&w=majority";
const cors = require('cors');
app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000', 
};

app.use(cors(corsOptions));

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use('/', authRoutes);
app.use('/', createQuizRoute);
app.use('/', getQuiz);
app.use('/', selectQuizRoute);
app.use('/', takeQuizRoute);
app.use('/', usersScoreRoute);
 
// Start the server
app.listen(8000, () => {
  console.log("Server started on port 8000");
});

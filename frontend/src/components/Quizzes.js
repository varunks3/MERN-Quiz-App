import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

function QuestionList() {
  const [data, setData] = useState([]);
  const history = useHistory();
  const handleShare = (quizId) => {
    const id = quizId;
    fetch("https://quiz-app-backend-varunks3.vercel.app/selectedquiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then((response) => {
      if (response.ok) {
       return response.json();
      }
      console.log({ id });
      throw new Error("Failed to send selected quiz");
    });
    history.push('/take-quiz');
  };
  useEffect(() => {
    fetch("https://quiz-app-backend-varunks3.vercel.app/quizzes")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>All Quizzes</h1>
      {data.map((quiz) => (
        <div key={quiz._id}>
          <h2>{quiz.title}</h2>
          <ol>
            {quiz.questions.map((q) => (
              <div key={q._id}>
                <h3>{q.sino}{"  "}{q.question}</h3>
                <ul>
                  {q.options.map((option) => (
                    <li key={option}>{option}</li>
                  ))}
                </ul>
              </ div>
            ))}
            <p>Share this quiz</p>
            <Button onClick={() => handleShare(quiz._id)}>Share</Button>
          </ol>
        </div>
      ))}
    </div>
  );
}

export default QuestionList;

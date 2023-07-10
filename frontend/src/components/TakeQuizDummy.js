import React, { useEffect, useState } from "react";

function TakeQuiz() {
  // const { quizId } = useParams();
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch(`http://localhost:8000/selectquiz`)
  //     .then((response) => response.json())
  //     .then((data) => setData(data))
  //     .catch((error) => console.log(error));
  // }, []);
  useEffect(() => {
    fetch(`http://localhost:8000/takequiz`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h1>Quiz</h1>
      <p>{data.title}</p>
      {data.questions ? (
        <ul>
          {data.questions.map((q) => (
            <li key={q._id}>
              <h3>{q.question}</h3>
              <ul>
                {q.options.map((option) => (
                  <label>
                  <input type="checkbox" />
                  {option}
                </label>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions available.</p>
      )}

    </div>
  );
}

export default TakeQuiz;

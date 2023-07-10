import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

function TakeQuiz() {
  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [email, setEmail] = useState("");
  // const [score, setScore] = useState("");

  const handleChange = (event, questionId) => {
    const isChecked = event.target.checked;
    const option = event.target.value;

    if (isChecked) {
      setCheckedItems((prevItems) => [...prevItems, { questionId, option }]);
    } else {
      setCheckedItems((prevItems) =>
        prevItems.filter(
          (item) => !(item.questionId === questionId && item.option === option)
        )
      );
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      email: email,
      myanswers: data.questions.map((q, index) => ({
        sino: index + 1,
        ans: checkedItems
          .filter((item) => item.questionId === q._id)
          .map((item) => item.option),
      })),
    };
    fetch("http://localhost:8000/takequiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      // Handle the response from the server
      if (response.ok) {
        return response.json();
      }
      console.log(formData);
      throw new Error("Failed to send form data");
    });
    console.log(formData);
  };

  useEffect(() => {
    fetch(`http://localhost:8000/takequiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data)
      )
      .catch((error) => console.log(error));
  }, []);
  console.log(data);
  return (
    <div>
      <h1>Quiz</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </Form.Group>
        {data.questions ? (
          <ul>
            {data.questions.map((q, index) => (
              <li key={q._id}>
                <h3>{q.question}</h3>
                <ul>
                  {q.options.map((option, optionIndex) => (
                    <label key={optionIndex}>
                      <input
                        type="checkbox"
                        checked={checkedItems.some(
                          (item) =>
                            item.questionId === q._id && item.option === option
                        )}
                        onChange={(e) => handleChange(e, q._id)}
                        value={option}
                      />
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {/* <p>{score}</p> */}
    </div>
  );
}

export default TakeQuiz;

import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();


function TakeQuiz() {
  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [email, setEmail] = useState("");
  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("mytoken", { path: "/" });
    window.location.href = "/";
  }
  const [result, setResult] = useState("");
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

    axios
      .post("https://quiz-app-backend-varunks3.vercel.app/takequiz", formData)
      .then((response) => {
        console.log(response);
        setData(response.data.data);
        // setscore(response.data.score);
        // setTotal(response.data.total);
        setResult(`Your total score is ${response.data.score} / ${response.data.total}`)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .post("https://quiz-app-backend-varunks3.vercel.app/takequiz")
      .then((response) => {
        const rdata = response.data;
        setData(rdata.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>
      <h1>Quiz</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            style={{ width: "50%" }}
          />
        </Form.Group>
        {data.questions ? (
          <div>
            {data.questions.map((q, index) => (
              <div key={q._id}>
                <h3>
                  {q.sino} {q.question}
                </h3>
                <ul>
                  {q.options.map((option, optionIndex) => (
                    <Form.Label key={optionIndex}>
                      <Form.Text style={{ margin: "4px" }}>{option} </Form.Text>
                      <Form.Check
                        type="checkbox"
                        checked={checkedItems.some(
                          (item) =>
                            item.questionId === q._id && item.option === option
                        )}
                        onChange={(e) => handleChange(e, q._id)}
                        value={option}
                      />
                    </Form.Label>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>No questions available.</p>
        )}
        <Button
          style={{ "margin-bottom": "4vh" }}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
        <h1>{result}</h1>
      </Form>
    </div>
  );
}

export default TakeQuiz;

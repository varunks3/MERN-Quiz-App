import { Form, Button } from "react-bootstrap";
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


function CreateQuiz() {
  const history = useHistory();
  const quiz = () => {
    let path = `/quizzes`;
    history.push(path);
  };
  const [formData, setFormData] = useState({
    title: "",
    questions: [
      {
        sino: 0,
        question: "",
        options: ["", "", "", ""],
        answers: [],
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [name]: value,
      };
      return {
        ...prevData,
        questions: updatedQuestions,
      };
    });
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[questionIndex].options[optionIndex] = value;
      return {
        ...prevData,
        questions: updatedQuestions,
      };
    });
  };

  const handleAnswerChange = (e, questionIndex) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      const currentAnswers = updatedQuestions[questionIndex].answers;
      if (checked) {
        const newAnswers = [...currentAnswers, value];
        updatedQuestions[questionIndex].answers = Array.from(new Set(newAnswers));
      } else {
        updatedQuestions[questionIndex].answers = currentAnswers.filter(
          (answer) => answer !== value
        );
      }
      return {
        ...prevData,
        questions: updatedQuestions,
      };
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/createquiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        // Handle the response from the server
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to create quiz");
      })
      .then((data) => {
        // Handle the data returned from the server
        console.log(data);
        // Reset the form
        setFormData({
          title: "",
          questions: [
            {
              sino: 0,
              question: "",
              options: ["", "", "", ""],
              answers: [],
            },
          ],
        });
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        console.error(error);
      });
  };

  const renderQuestions = () => {
    return formData.questions.map((question, index) => (
      <div key={index} style={{"margin":"auto","width":"50%"}}>
        <h4  style={{"font-weight":"400"}}>Question {index + 1}</h4>
        <Form.Label>
          Serial Number:
          <Form.Control
            type="number"
            name="sino"
            value={question.sino}
            onChange={(e) => handleQuestionChange(e, index)}
          />
        </Form.Label>
        <br />
        <Form.Label>
          Question:
          <Form.Control
            type="text"
            name="question"
            value={question.question}
            onChange={(e) => handleQuestionChange(e, index)}
          />
        </Form.Label>
        <br />
        <Form.Label>
          Options:
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}  style={{"margin":"3px"}}>
              <Form.Control
                type="text"
                name="options"
                value={option}
                onChange={(e) => handleOptionChange(e, index, optionIndex)}
              />
            </div>
          ))}
        </Form.Label>
        <br />
        <Form.Label>
          Answer:
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <Form.Label>
                <Form.Check
                  type="checkbox"
                  name="answers"
                  value={option}
                  checked={question.answers.includes(option)}
                  onChange={(e) => handleAnswerChange(e, index)}
                />
                {option}
              </Form.Label>
            </div>
          ))}
        </Form.Label>
        <hr />
      </div>
    ));
  };

  return (
    <div style={{"margin":"auto","width":"50%"}}>
       <h1 style={{"margin":"auto","width":"50%"}}>Create a Quiz</h1>
      <Form onSubmit={handleSubmit}>
        <h3 style={{"margin":"auto","width":"50%", "font-weight":"400"}}>Title</h3>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{"margin":"auto","width":"50%"}}
          />
        <br />
        {renderQuestions()}
        <Button
          type="button"
          style={{"margin":"4px","width":"50%","float":"right"}}
          onClick={() =>
            setFormData((prevData) => ({
              ...prevData,
              questions: [
                ...prevData.questions,
                {
                  sino: 0,
                  question: "",
                  options: ["", "", "", ""],
                  answers: [],
                },
              ],
            }))
          }
        >
          Add Question
        </Button>
        <br />
        <Button  style={{"margin":"4px","width":"50%","float":"right"}} type="submit">Submit</Button>
      </Form>
      <Button  style={{"margin":"4px","margin-bottom":"18px","width":"50%","float":"right"}} variant="primary" type="submit" onClick={(e) => quiz(e)}>
        Show all quizzes
      </Button>
    </div>
  );
};


export default CreateQuiz;

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
const cookies = new Cookies();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const history = useHistory();
  const { quizId } = useParams();
  const register = () => {
    let path = `/participantsignup`;
    history.push(path);
  };
  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "https://quiz-app-backend-varunks3.vercel.app/participantlogin",
      data: {
        email,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        console.log(result.data.mytoken)
        cookies.set("mytoken", result.data.mytoken, {
          path: "/",
        });
        window.location.href = `/take-quiz/`;
        setLogin(true);
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <div style={{"margin":"auto","width":"50%"}}>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>

        {/* display success message */}
        {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}
        <p>Register account</p>
        <Button variant="primary" type="submit" onClick={(e) => register(e)}>
          Register
        </Button>
      </Form>
    </div>
  );
}

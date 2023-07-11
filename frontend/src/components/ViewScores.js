import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const ViewScores = () => {
  const [userList, setUserList] = useState([]);
  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("mytoken", { path: "/" });
    window.location.href = "/";
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://quiz-app-backend-varunks3.vercel.app/users-score");
      const data = await response.json();
      setUserList(data);
    };

    fetchData();
  }, []);

  return (
    <div style={{"width":"50%","margin":"auto"}}>
      <div style={{"text-align":"right"}}>
      <Button  type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>
      </div>
    <h2 style={{"text-align":"center"}}>User Scores</h2>
    <Table striped bordered >
      <thead>
        <tr>
          <th>Email</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((user) => (
          <tr key={user.id}>
            <td>{user.email}</td>
            <td>{user.score}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
};

export default ViewScores;

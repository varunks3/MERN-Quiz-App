import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";


const ViewScores = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/users-score");
      const data = await response.json();
      setUserList(data);
    };

    fetchData();
  }, []);

  return (
    <div style={{"width":"50%","margin":"auto"}}>
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

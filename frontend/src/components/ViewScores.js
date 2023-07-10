import React, { useState, useEffect } from 'react';

const ViewScores = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/users-score'); 
      const data = await response.json();
      setUserList(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>User Data</h1>
      {userList.map((user) => (
        <div key={user._id}>
          <p>Email: {user.email}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: {user.score}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewScores;

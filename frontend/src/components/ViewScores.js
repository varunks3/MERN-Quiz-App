import React, { useState, useEffect } from 'react';

const ViewScores = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Fetch data from the API or use the provided data directly
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/userscores'); // Replace with your API endpoint
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

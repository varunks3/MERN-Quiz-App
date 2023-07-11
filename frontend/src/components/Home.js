import React from 'react'
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";


function Home() {

    const history = useHistory();

  const admin = () =>{ 
    let path = `/register`; 
    history.push(path);
  }

  const user = () =>{ 
    let path = `/participantsignup`; 
    history.push(path);
  }
  return (
    <div style={{"margin":"auto","width":"50%"}}>
        <h1>Welcome to Quiz</h1>
        < h2 style={{"margin-top":"6vh"}} >Want to create a new quiz?</ h2>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => admin(e)}
        >
          Create Quiz
        </Button>
        <h2>Take quiz</h2>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => user(e)}
        >
          Take quiz
        </Button>
    </div>
  )
}

export default Home
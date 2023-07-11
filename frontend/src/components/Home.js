import React from 'react'
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";


function Home() {

    const history = useHistory();

  const admin = () =>{ 
    let path = `/login`; 
    history.push(path);
  }

  const user = () =>{ 
    let path = `/participantlogin`; 
    history.push(path);
  }
  return (
    <div style={{"margin":"auto","width":"50%"}}>
        <h1>Welcome to Quiz</h1>
        < h2 style={{"marginTop":"6vh"}} >Admin login?</ h2>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => admin(e)}
        >
          Admin
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
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Register from "./components/Register";
import Login from "./components/Login";
import CreateQuiz from "./components/CreateQuiz";
import ProtectedRoutes from "./ProtectedRoutes";
import Quizzes from "./components/Quizzes";
import TakeQuiz from "./components/TakeQuiz";
import ParticipantLogin from "./components/ParticipantLogin";
import ParticipantRegister from "./components/ParticipantRegister";
import ViewScores from "./components/ViewScores";

function App() {
  return (
    <Container>
    {/* create routes here */}
    <Switch>
      <Route exact path="/" component={Register} />
      <Route exact path="/login" component={Login} />
      <ProtectedRoutes path="/createquiz" component={CreateQuiz} />
      <Route exact path = "/quizzes" component={Quizzes} /> 
      <Route exact path = "/take-quiz/" component={TakeQuiz} /> 
      <Route exact path="/participantsignup" component={ParticipantRegister} />
      <Route exact path="/participantlogin" component={ParticipantLogin} />
      {/* <Route exact path = "/take-quiz/:quizId?" component={TakeQuiz} />  */}
      <Route exact path="/userscores" component={ViewScores} />
    </Switch>
  </Container>
  );
}

export default App;

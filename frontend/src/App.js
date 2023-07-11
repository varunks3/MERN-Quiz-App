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
import Home from "./components/Home";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <Container>
    {/* create routes here */}
    <Switch>
    <Route exact path="/" component={Home} />
      <Route exact path="/Register" component={Register} />
      <Route exact path="/login" component={Login} />
      <ProtectedRoutes path="/adminpanel" component={AdminPanel} />
      <ProtectedRoutes path="/createquiz" component={CreateQuiz} />
      <Route exact path = "/quizzes" component={Quizzes} /> 
      <Route exact path = "/take-quiz/" component={TakeQuiz} /> 
      <Route exact path="/participantsignup" component={ParticipantRegister} />
      <Route exact path="/participantlogin" component={ParticipantLogin} />
      {/* <Route exact path = "/take-quiz/:quizId?" component={TakeQuiz} />  */}
      <Route exact path="/usersscore" component={ViewScores} />
    </Switch>
  </Container>
  );
}

export default App;

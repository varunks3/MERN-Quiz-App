import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function AdminPanel() {
  const history = useHistory();
  const create = () => {
    let path = `/createquiz`;
    history.push(path);
  };
  const showallquiz = () => {
    let path = `/quizzes`;
    history.push(path);
  };
  const viewcurrentquiz = () => {
    let path = `/take-quiz`;
    history.push(path);
  };
  const viewscores = () => {
    let path = `/usersscore`;
    history.push(path);
  };
  return (
    <div style={{
        "display": "flex",
        "justifyContent": "center",
        "flexDirection": "column",
        "width": "50%",
        "margin":"auto",
      }}>
      <Button
        style={{

        "margin":"8px",
        "margiTop":"16px"
      }}
        variant="primary"
        type="submit"
        onClick={(e) => create(e)}
      >
        Create a Quiz
      </Button>
      <Button
        style={{
        "margin":"8px",
      }}
        variant="primary"
        type="submit"
        onClick={(e) => showallquiz(e)}
      >
        Show all quizzes
      </Button>
      <Button
        style={{
        "margin":"8px",
      }}
        variant="primary"
        type="submit"
        onClick={(e) => viewcurrentquiz(e)}
      >
        View Current Quiz
      </Button>
      <Button
        style={{
        "margin":"8px",
      }}
        variant="primary"
        type="submit"
        onClick={(e) => viewscores(e)}
      >
        View Users Score
      </Button>
    </div>
  );
}

export default AdminPanel;

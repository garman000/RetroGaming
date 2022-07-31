import React, { useContext, useEffect, useState } from "react";
import { Alert, Row, Col, Container } from "react-bootstrap";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getLastScore, getHighestScore } from "../services/server.js";

function HomePage() {
  const { activeUser } = useContext(AuthContext);
  const [lastScore, setLastScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserLastScore() {
      const response = await getLastScore(activeUser.email);
      if (response.lastScore) setLastScore(response.lastScore.score);
      else setLastScore(0)
    }
    async function getUserHighestScore() {
      const response = await getHighestScore(activeUser.email);
      if (response.highestScore) setHighestScore(response.highestScore.score);
      else setHighestScore(0)
    }
    getUserLastScore();
    getUserHighestScore();
  }, []);
  return (
    <>
      <Container>
        <Alert variant="info">
          Hi {activeUser.nickname}, the last time you played you received a
          score of {lastScore} and your higher score is {highestScore}!!
        </Alert>
        <Row className="justify-content-md-center">
          <Col xs lg="5 px-5">
            <div
              onClick={() => navigate("/game")}
              className="imgTest header text rps "
            ></div>{" "}
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          {/* <div className="testt"> */}
          <Col xs lg="5 px-5">
            <div className="imgTest header text tetris"></div>{" "}
          </Col>
          {/* </div> */}
          <Col xs lg="5">
            <div className="imgTest header text snake"></div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="imgTest header text pacman"></div>
          </Col>
          <Col>
            <div className="imgTest header text spaceInvaders"></div>
          </Col>
          <Col>
            <div className="imgTest header text mario"></div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;

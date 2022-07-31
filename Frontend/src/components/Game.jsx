import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../scss/game.scss";
import "../scss/header.scss";
import Header from "./Header";

function Game({ score, setScore, myChoice }) {
  const [house, setHouse] = useState("");
  const [playerWin, setPlayerWin] = useState("");
  const [counter, setCounter] = useState(1);
  const [attempt, setAttempt] = useState(null);
  const [attemptButton, sendAttemptButton] = useState(false);
  const [sendScore, setSendScore] = useState();

  

  const newHousePick = () => {
    const choices = ["rock", "paper", "scissors"];
    setHouse(choices[Math.floor(Math.random() * 3)]);
  };

  useEffect(() => {
    newHousePick();
  }, []);

  useEffect(() => {
    if (score < 20) {
      newHousePick();
    } else {
      newHousePick();
      setScore(0);
    }
  }, []);

  const Result = () => {
    if (myChoice === "rock" && house === "scissors") {
      setPlayerWin("win");
      setScore(score + 10);
      setAttempt(attempt + 1);
    } else if (myChoice === "rock" && house === "paper") {
      setPlayerWin("lose");
      setScore(score - 1);
      setAttempt(attempt + 1);
    } else if (myChoice === "scissors" && house === "paper") {
      setPlayerWin("win");
      setScore(score + 10);
      setAttempt(attempt + 1);
    } else if (myChoice === "scissors" && house === "rock") {
      setPlayerWin("lose");
      setScore(score - 1);
      setAttempt(attempt + 1);
    } else if (myChoice === "paper" && house === "rock") {
      setPlayerWin("win");
      setScore(score + 10);
      setAttempt(attempt + 1);
    } else if (myChoice === "paper" && house === "scissors") {
      setPlayerWin("lose");
      setScore(score - 1);
      setAttempt(attempt + 1);
    } else {
      setPlayerWin("draw");
    }
    setAttempt(0);
  };

  useEffect(() => {
    const timer =
      counter > 0
        ? setInterval(() => {
            setCounter(counter - 1);
          }, 1000)
        : Result();

    return () => {
      clearInterval(timer);
    };
  }, [counter, house]);

  return (
    <Container>
      <Header score={score} />
      <div className="game">
        <div className="game__you">
          <span className="gameHeaderCtl"> You Picked</span>
          <div className={`icon icon--${myChoice}`}></div>
        </div>

        {playerWin === "win" && (
          <div className="game__play">
            <span className="text">You Win!</span>
            <Link to="/game" className="play-again" onClick={() => setHouse()}>
              Play Again
            </Link>
          </div>
        )}
        {playerWin === "lose" && (
          <div className="game__play">
            <span className="text">You Lose!</span>
            <Link to="/game" className="play-again" onClick={() => setHouse()}>
              Play Again
            </Link>
          </div>
        )}
        {playerWin === "draw" && (
          <div className="game__play">
            <span className="text">You Draw</span>
            <Link to="/game" className="play-again" onClick={() => setHouse()}>
              Play Again
            </Link>
          </div>
        )}

        <div className="game__house">
          <span className="gameHeaderCtl">AI Picked</span>
          {counter === 0 ? (
            <div
              className={`icon icon--${house} ${
                playerWin === "lose" ? `icon icon--${house}--winner` : ""
              }`}
            ></div>
          ) : (
            <div className="counter">{counter}</div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Game;

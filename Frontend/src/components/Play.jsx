import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Triangle from "../images/bg-triangle.svg";
import "../scss/play.scss";
import "../scss/header.scss";
import "../scss/game.scss";
import { Container } from "react-bootstrap";


const Play = ({ setMyChoice  }) => {
  const setChoice = (e) => {
    setMyChoice(e.target.dataset.id);
  };

 
  return (
      <Container>
    <div className="text title">
        <span>Rock</span>
        <span>Paper</span>
        <span>Scissors</span>
      </div>
    <div className="play">
        
      <img src={Triangle} className="triangle" alt="triangle" />
      <div className="items">
        <Link to="/play">
          <div
            data-id="paper"
            onClick={setChoice}
            className="icon icon--paper"
          ></div>
        </Link>
        <Link to="/play">
          <div
            data-id="scissors"
            onClick={setChoice}
            className="icon icon--scissors"
          ></div>
        </Link>{" "}
        <Link to="/play">
          <div
            data-id="rock"
            onClick={setChoice}
            className="icon icon--rock"
          ></div>
        </Link>
        
      </div>
    </div>
    </Container>
  );
};

export default Play;

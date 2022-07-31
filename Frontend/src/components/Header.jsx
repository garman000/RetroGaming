import React, { useContext, useEffect, useState } from "react";
import "../scss/header.scss";
import { Button } from "react-bootstrap";
import AuthContext from "../contexts/AuthContext";
import { addScore } from "../services/server";
import { useNavigate } from "react-router-dom";

function Header({ score }) {
  const [sendScoreButton, setSendScoreButton] = useState(false);
  const [recentScore, setRecentScore] = useState([  ]);
  // const [scoreGame, setScoreGame] = useState(0)
  const { activeUser } = useContext(AuthContext);
  const [addScoreError, setAddScoreError] = useState(false);
  const navigate = useNavigate();

  async function handleSendScore() {
    console.log(activeUser);
    setAddScoreError(false);
    let newScore = {
      email: activeUser.email,
      score: score,
      game: "rock-paper-scissors",
    };
    try {
      await addScore(newScore);
      navigate("/game");
    } catch (err) {
      setAddScoreError(err.response.data.message);
    }
    setSendScoreButton(false);
  }

  
useEffect(() => {
  if(score >= 20 ) {
      setSendScoreButton(true)
  }
}, [score])


  return (
    <div className="header">
      <div className="text">
        <span>Rock</span>
        <span>Paper</span>
        <span>Scissors</span>
        {sendScoreButton && <Button className="mt-4" onClick={handleSendScore}> End Game </Button>}
      </div>
      <div className="score-box">
        <span>Score</span>
        <div className="score-box__score">{score}</div>
      </div>
    </div>
  );
}

export default Header;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GameUpdate } from "./GameUpdate";
import GoodPoro from "../images/GoodPoro.jpg";
import EvilPoro from "../images/EvilPoro.png";
import TeamPoros from "../images/TeamPoros.png";
import Cardback from "../images/Cardback.jpg";

export default function GameContent() {
  const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [startGame, setStartGame] = useState(false);

  const [goodPoroPosition, setGoodPoroPosition] = useState("");

  const [evilPoroPosition, setEvilPoroPosition] = useState("");

  const [teamPorosPosition, setTeamPorosPosition] = useState("");

  const [score, setScore] = useState(0);

  const [timer, setTimer] = useState(30);

  const handleStart = () => {
    setStartGame(true);
    setTimer(30);
    setScore(0);
  };

  useEffect(() => {
    if (!startGame) return;
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setTimeout(() => setStartGame(false), 700);
    }
  }, [startGame, timer]);

  function handleRandomCell() {
    return cells[Math.floor(Math.random() * cells.length)];
  }

  useEffect(() => {
    let GoodPoroInterval = null;
    let EvilPoroInterval = null;
    let TeamPorosInterval = null;
    if (startGame) {
      GoodPoroInterval = setInterval(() => {
        setGoodPoroPosition(handleRandomCell());
      }, 1000);

      EvilPoroInterval = setInterval(() => {
        setEvilPoroPosition(handleRandomCell());
      }, 5000);

      TeamPorosInterval = setInterval(() => {
        setTeamPorosPosition(handleRandomCell());
      }, 7000);
    }
    return () => {
      setGoodPoroPosition("");
      setEvilPoroPosition("");
      setTeamPorosPosition("");
      clearInterval(GoodPoroInterval);
      clearInterval(EvilPoroInterval);
      clearInterval(TeamPorosInterval);
    };
  }, [startGame]);

  useEffect(() => {
    setTimeout(() => {
      setEvilPoroPosition("");
    }, 1000);
  }, [evilPoroPosition]);

  useEffect(() => {
    setTimeout(() => {
      setTeamPorosPosition("");
    }, 1000);
  }, [teamPorosPosition]);

  const handleScore = (clickedCell) => {
    if (clickedCell === goodPoroPosition) {
      setScore(score + 1);
      setGoodPoroPosition("");
    }
    if (clickedCell === evilPoroPosition) {
      setScore(score - 3);
      setEvilPoroPosition("");
    }
    if (clickedCell === teamPorosPosition) {
      setScore(score + 5);
      setTeamPorosPosition("");
    }
    return;
  };

  return (
    <GameContentContainer>
      <CellsContainer>
        {cells.map((cell, index) => (
          <CellWrapper key={index}>
            {(goodPoroPosition ||
              evilPoroPosition ||
              teamPorosPosition ||
              goodPoroPosition === "") && (
              <ImageWrapper
                src={
                  (goodPoroPosition === cell && GoodPoro) ||
                  (evilPoroPosition === cell && EvilPoro) ||
                  (teamPorosPosition === cell && TeamPoros) ||
                  Cardback
                }
                alt="Poro"
                draggable="false"
                onClick={() => handleScore(cell)}
                location={cell}
                goodPoroPosition={goodPoroPosition}
                evilPoroPosition={evilPoroPosition}
                teamPorosPosition={teamPorosPosition}
              />
            )}
          </CellWrapper>
        ))}
      </CellsContainer>
      <GameUpdate
        handleStart={handleStart}
        startGame={startGame}
        score={score}
        timer={timer}
      />
    </GameContentContainer>
  );
}

const GameContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%;
  width: 1500px;
`;

const CellsContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 600px;
  padding-top: 60px;
  padding-bottom: 8vh;
  gap: 20px;

  @media all and (max-width: 768px) {
    width: 300px;
  }

  @media all and (max-width: 500px) {
    gap: 8px;
  }
`;

const CellWrapper = styled.div`
  display: flex;
  position: relative;
  height: 200px;
  width: 200px;
  border-radius: 10px;

  @media all and (max-width: 768px) {
    width: 150px;
    height: 150px;
  }

  @media all and (max-width: 500px) {
    width: 100px;
    height: 100px;
  }
`;

const ImageWrapper = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 0 20px 2px white;

  box-shadow: ${({ teamPorosPosition, location }) =>
    teamPorosPosition === location ? "0 0 20px 5px #ff5eb9" : "default"};

  box-shadow: ${({ evilPoroPosition, location }) =>
    evilPoroPosition === location ? "0 0 20px 5px black" : "default"};

  box-shadow: ${({ goodPoroPosition, location }) =>
    goodPoroPosition === location ? "0 0 20px 2px #0f8bff" : "default"};
`;

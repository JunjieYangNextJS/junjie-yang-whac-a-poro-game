import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { GameUpdate } from "./GameUpdate";
import GoodPoro from "../images/GoodPoro.jpg";
import EvilPoro from "../images/EvilPoro.png";
import TeamPoros from "../images/TeamPoros.png";
import Cardback from "../images/Cardback.jpg";

export default function GameContent() {
  const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [startGame, setStartGame] = useState(false);

  const [goodPoroPosition, setGoodPoroPosition] = useState(0);

  const [evilPoroPosition, setEvilPoroPosition] = useState(0);

  const [teamPorosPosition, setTeamPorosPosition] = useState(0);

  const [score, setScore] = useState(0);

  function handleRandomCell() {
    // return cells[Math.floor(Math.random() * 9)];
    // let filteredCells = cells.filter(
    //   (cell) =>
    //     cell !== goodPoroPosition &&
    //     cell !== evilPoroPosition &&
    //     cell !== teamPorosPosition
    // );

    // console.log("filteredCells", filteredCells.length);

    return cells[Math.floor(Math.random() * cells.length)];
  }

  console.log(goodPoroPosition, "Good Poro");
  // console.log(evilPoroPosition, "Evil Poro");
  // console.log(teamPorosPosition, "Team Poros");

  useEffect(() => {
    if (!startGame) return;
    let timerGoodPoro = setInterval(() => {
      setGoodPoroPosition(
        // (goodPoroPosition === "" ||
        //   (goodPoroPosition !== evilPoroPosition) !== teamPorosPosition) &&
        //   handleRandomCell()

        handleRandomCell()
      );
    }, 1000);

    console.log(
      goodPoroPosition,
      evilPoroPosition,
      teamPorosPosition,
      "please"
    );

    let timerEvilPoro = setInterval(() => {
      setEvilPoroPosition(
        // (evilPoroPosition === "" ||
        //   (evilPoroPosition !== goodPoroPosition) !== teamPorosPosition) &&
        //   handleRandomCell()

        handleRandomCell()
      );
    }, 5000);

    let timerTeamPoros = setInterval(() => {
      setTeamPorosPosition(
        // (teamPorosPosition === "" ||
        //   (teamPorosPosition !== goodPoroPosition) !== evilPoroPosition) &&
        //   handleRandomCell()
        handleRandomCell()
      );
    }, 7000);

    // clearInterval(timerId)
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

  console.log("Score", score);

  return (
    <GameContentContainer>
      <CellsContainer>
        {cells.map((cell, index) => (
          <CellWrapper key={index}>
            {(goodPoroPosition || evilPoroPosition || teamPorosPosition) && (
              <ImageWrapper
                src={
                  (goodPoroPosition === cell && GoodPoro) ||
                  (evilPoroPosition === cell && EvilPoro) ||
                  (teamPorosPosition === cell && TeamPoros) ||
                  Cardback
                }
                alt="Poro"
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
      <GameUpdate setStartGame={setStartGame} score={score} />
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
`;

const CellWrapper = styled.div`
  display: flex;
  position: relative;
  height: 200px;
  width: 200px;

  background-color: #fff;
  border-radius: 10px;
`;

const ImageWrapper = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

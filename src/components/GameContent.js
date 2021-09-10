import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
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

  const [colorEffect, setColorEffect] = useState("");

  const [timer, setTimer] = useState(30);

  const savedRandomCell = useRef();

  // Starts the game and reset the timer and reset the score when user click the play button.
  const handleStart = () => {
    setStartGame(true);
    setTimer(30);
    setScore(0);
  };

  // Countdown happens when the game starts.
  useEffect(() => {
    if (!startGame) return;
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setTimeout(() => setStartGame(false), 700);
    }
  }, [startGame, timer]);

  // the function to be called each time the game wants poros to appear at a random cell.
  function handleRandomCell() {
    return cells[Math.floor(Math.random() * cells.length)];
  }

  savedRandomCell.current = handleRandomCell;

  // defines the likelihood and frequency for different poros to appear at each second while the game is being played.
  useEffect(() => {
    let GoodPoroInterval = null;
    let EvilPoroInterval = null;
    let TeamPorosInterval = null;
    if (startGame) {
      GoodPoroInterval = setInterval(() => {
        setGoodPoroPosition(savedRandomCell.current());
      }, 1000);

      EvilPoroInterval = setInterval(() => {
        setEvilPoroPosition(savedRandomCell.current());
      }, 5000);

      TeamPorosInterval = setInterval(() => {
        setTeamPorosPosition(savedRandomCell.current());
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

  // EvilPoro and TeamsPoro will show up in between 0.5s to 1.9s only to make the game spicy and more random.
  useEffect(() => {
    setTimeout(() => {
      setEvilPoroPosition("");
    }, Math.floor(Math.random() * 1400 + 500));
    setTimeout(() => {
      setTeamPorosPosition("");
    }, Math.floor(Math.random() * 1400 + 500));
  }, [evilPoroPosition, teamPorosPosition]);

  // defines scoring and scoring color effects after poros are clicked.
  const handleScore = (clickedCell) => {
    if (clickedCell === goodPoroPosition) {
      setScore(score + 1);
      setColorEffect("+1");
      setTimeout(() => {
        setColorEffect("");
      }, 500);
      setGoodPoroPosition("");
    }
    if (clickedCell === evilPoroPosition) {
      setScore(score - 3);
      setColorEffect("-3");
      setTimeout(() => {
        setColorEffect("");
      }, 500);
      setEvilPoroPosition("");
    }
    if (clickedCell === teamPorosPosition) {
      setScore(score + 5);
      setColorEffect("+5");
      setTimeout(() => {
        setColorEffect("");
      }, 500);
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
      <ImageExplainer>
        <ImageMeaning meaning={"+1"} colorEffect={colorEffect}>
          <img src={GoodPoro} alt="Cute Poro" /> +1
        </ImageMeaning>
        <ImageMeaning meaning={"-3"} colorEffect={colorEffect}>
          <img src={EvilPoro} alt="Evil Poro" /> -3
        </ImageMeaning>
        <ImageMeaning meaning={"+5"} colorEffect={colorEffect}>
          <img src={TeamPoros} alt="a team of Poros" /> +5
        </ImageMeaning>
      </ImageExplainer>
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
  padding-bottom: 3vh;
  gap: 20px;

  @media all and (max-width: 768px) {
    width: 300px;
  }

  @media all and (max-width: 500px) {
    gap: 7px;
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

const ImageExplainer = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
  padding-bottom: 1vh;
`;

const ImageMeaning = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  gap: 3px;

  ${({ colorEffect, meaning }) =>
    colorEffect === meaning &&
    css`
      color: red;
      font-size: 26px;
      gap: 1px;
    `}

  img {
    width: 50px;
    height: 50px;
    border-radius: 10px;
  }
`;

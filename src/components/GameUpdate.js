import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SiAiqfome } from "react-icons/si";
import { SiApachespark } from "react-icons/si";
import { SiAngellist } from "react-icons/si";

export const GameUpdate = ({ setStartGame, score }) => {
  const [highestRecord, setHighestRecord] = useState(0);

  const [congratsMessage, setCongratsMessage] = useState(false);

  const handleStart = () => {
    setStartGame(true);
  };
  //   useEffect(() => {
  //     if (correct.length === 12 && correctRate > highestRecord) {
  //       setHighestRecord(correctRate);
  //       setCongratsMessage(true);
  //     }
  //   }, [correct]);

  return (
    <GameUpdateContainer>
      <GameUpdaters>
        <UpperDiv>
          <ScoreWrapper>
            <SiAiqfome />
            Score: {score}
          </ScoreWrapper>
          <CorrectCountWrapper>
            <SiApachespark />
            Pairs
          </CorrectCountWrapper>
          <CorrectRateWrapper>
            <SiAngellist />
            Success Rate
          </CorrectRateWrapper>
        </UpperDiv>

        <ButtomDiv>
          <CongratsMessageWrapper congratsMessage={congratsMessage}>
            Congratulations! You just set a new record !
          </CongratsMessageWrapper>

          <HighestRecordWrapper>
            Your highest Score is now {score} points!
          </HighestRecordWrapper>
        </ButtomDiv>
      </GameUpdaters>
      <PlayAgainWrapper onClick={handleStart}>Play</PlayAgainWrapper>
    </GameUpdateContainer>
  );
};

const GameUpdateContainer = styled.div`
  display: flex;
  width: 800px;
  padding-bottom: 20px;

  @media all and (max-width: 1024px) {
    width: 600px;
  }

  @media all and (max-width: 768px) {
    width: 300px;
  }
`;

const GameUpdaters = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  font-size: 20px;
  gap: 20px;
`;

const UpperDiv = styled.div``;

const ScoreWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CorrectCountWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CorrectRateWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ButtomDiv = styled.div``;

const CongratsMessageWrapper = styled.div`
  visibility: ${({ congratsMessage }) =>
    congratsMessage ? "default" : "hidden"};
`;

const HighestRecordWrapper = styled.div``;

const PlayAgainWrapper = styled.div`
  color: #1b1b1b;
  box-shadow: 0 0 5px 2px white;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 700;
  height: 50px;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;

  @media all and (max-width: 768px) {
    font-size: 16px;
  }
`;

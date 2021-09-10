import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { SiAiqfome } from "react-icons/si";
import { BsClockHistory } from "react-icons/bs";

export const GameUpdate = ({ handleStart, startGame, score, timer }) => {
  const [message, setMessage] = useState(false);

  const highestRecord = useRef(0);

  // sends a congratulating or motivating message to the user after they finish the game depending on the scoring.
  useEffect(() => {
    if (!startGame && timer === 0) {
      if (score <= highestRecord.current) {
        setMessage("Unlucky! You will do better next time");
      } else {
        highestRecord.current = score;
        setMessage("Congratulations! You just set a new record");
      }
    } else setMessage("");
  }, [startGame, score, timer]);

  return (
    <GameUpdateContainer>
      <GameUpdaters>
        <UpperDiv>
          <ScoreWrapper>
            <IconWrapper>
              <SiAiqfome />
            </IconWrapper>
            Score: {score}
          </ScoreWrapper>
          <TimeLeftWrapper timer={timer}>
            <IconWrapper>
              <BsClockHistory />
            </IconWrapper>
            Time Left: {timer}s
          </TimeLeftWrapper>
        </UpperDiv>

        <ButtomDiv>
          <MessageWrapper message={message}>{message}!</MessageWrapper>

          <HighestRecordWrapper>
            Your highest Score is now {highestRecord.current} points!
          </HighestRecordWrapper>
        </ButtomDiv>
      </GameUpdaters>
      <PlayAgainWrapper onClick={startGame ? undefined : handleStart}>
        {highestRecord.current === 0 ? "Play" : "Play Again"}
      </PlayAgainWrapper>
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

const IconWrapper = styled.span``;

const TimeLeftWrapper = styled.div`
  display: flex;
  gap: 10px;
  color: ${({ timer }) => (timer === 0 ? "red" : "yellow")};
`;

const ButtomDiv = styled.div``;

const MessageWrapper = styled.div`
  visibility: ${({ message }) => (message ? "default" : "hidden")};
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

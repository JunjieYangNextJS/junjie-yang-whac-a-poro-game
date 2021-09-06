import styled from "styled-components";
import GameContent from "./components/GameContent";

function App() {
  return (
    <WhacAMole>
      <GameContent />
    </WhacAMole>
  );
}

export default App;

const WhacAMole = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: auto;
  width: 100%;
  background: radial-gradient(#9cffbb, #08a83b);
`;

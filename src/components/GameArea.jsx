import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";
import { useGamePageContext } from "../contexts/GamePageContext.jsx";
import Tictactoe from "./Tictactoe.jsx";
import MemoryGame from "./MemoryGame.jsx";
import { useGlobalContext } from "../contexts/GlobalContext";
import "../styles/componentsStyles/GameArea.css";

const GameArea = ({ gameName }) => {
  const { mainUser } = useGlobalContext();
  const { room } = useGamePageContext();
  const [turn, setturn] = useState(true);
  const username = mainUser.username

  const toggleTurn = () => {
    setturn(!turn);
  };
  useEffect(() => {}, []);
  console.log(room);
  return (
    <div>
      <div className="GameTitle">
        <span className="turns">turn:</span>
        <span id={turn ? "player1" : "player2"}>{turn? "your": "opps"}</span>
      </div>
      <button onClick={toggleTurn}  />
      {gameName === "Tictactoe" ? <Tictactoe /> : <MemoryGame />}
    </div>
  );
};

export default GameArea;

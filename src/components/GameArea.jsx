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
  const [yourTurn, setyourTurn] = useState(false);
  const username = mainUser.username

  const toggleTurn = async (e) => {
    e.preventDefault();
    setturn(!yourTurn);
  };

  useEffect(() => {
    socket.on("You'reFirst", () => {
      setyourTurn(!yourTurn)
    })
  }, [])
  
 
  console.log(room);
  return (
    <div>
      <div className="GameTitle">
        <span className="turns">turn:</span>
        <span id={yourTurn ? "player1" : "player2"}>{yourTurn? "your": "opps"}</span>
      </div>
      <button onClick={toggleTurn}  />
      {gameName === "Tictactoe" ? <Tictactoe /> : <MemoryGame />}
    </div>
  );
};

export default GameArea;

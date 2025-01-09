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
  const [turn, setTurn] = useState(false);

  const username = mainUser.username

  const toggleTurn = async (e) => {
    e.preventDefault();
    setTurn(!turn);
  };

  useEffect(() => {
    socket.on("you'reFirst", () => {
      console.log("ImFirst");
      setTurn(!turn)
    })
    socket.on("NextTurn", () => {
      console.log("NextTurn");
      setTurn(!turn)
    })
  }, [turn])

  return (
    <div>
      <div className="GameTitle">
        <span className="turns">turn:</span>
        <span id={turn ? "player1" : "player2"}>{turn? "your": "opps"}</span>
      </div>
      <button onClick={toggleTurn}  />
      {gameName === "Tictactoe" ? <Tictactoe yourTurn={turn}/> : <MemoryGame yourTurn={turn}/>}
    </div>
  );
};

export default GameArea;

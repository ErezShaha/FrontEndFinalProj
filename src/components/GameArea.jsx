import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";
import { useGamePageContext } from "../contexts/GamePageContext.jsx";
import Tictactoe from "./Tictactoe.jsx";
import MemoryGame from "./MemoryGame.jsx";
import { useGlobalContext } from "../contexts/GlobalContext";
import "../styles/componentsStyles/GameArea.css";

const GameArea = ({ gameName }) => {
  const { mainUser } = useGlobalContext();
  const [turn, setTurn] = useState(false);
  const [winner, setWinner] = useState();

  const username = mainUser.username;

  // const toggleTurn = async (e) => {
  //   e.preventDefault();
  //   setTurn(!turn);
  // };

  useEffect(() => {
    socket.on("you'reFirst", () => {
      console.log("ImFirst");
      setTurn(!turn);
    });
    socket.on("NextTurn", () => {
      console.log("NextTurn");
      setTurn(!turn);
    });
    socket.on("Tie", () => {
      setWinner("tie");
    });
    socket.on("Win", (winCondition, winner) => {
      setWinner(winner);
    });
  }, [turn]);

  return (
    <div>
      <div className="GameTitle">
        <span className="turns">turn:</span>
        <span id={turn ? "player1" : "player2"}>{turn ? "your" : "opps"}</span>
        <br/>
        {winner ? (
          winner === "tie" ? (
            <span className="conclusion">its a tie</span>
          ) : (
            <span className="conclusion">{`${winner} won`}</span>
          )
        ) : null}
      </div>
      {gameName === "Tictactoe" ? (
        <Tictactoe yourTurn={turn} />
      ) : (
        <MemoryGame yourTurn={turn} />
      )}
    </div>
  );
};

export default GameArea;

// <div>
//   {winCondition ? (
//     winCondition === "tie" ? (
//       <h1>Its A Tie. Game Over</h1>
//     ) : (
//       <h1>{`Player ${winner} Won The Game`}</h1>
//     )
//   ) : null}
// </div>;

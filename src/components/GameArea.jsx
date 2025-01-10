import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";
import { useGamePageContext } from "../contexts/GamePageContext.jsx";
import Tictactoe from "./Tictactoe.jsx";
import MemoryGame from "./MemoryGame.jsx";
import { useNavigate } from "react-router";
import { useGlobalContext } from "../contexts/GlobalContext";
import "../styles/componentsStyles/GameArea.css";

const GameArea = ({ gameName }) => {
  const { mainUser } = useGlobalContext();
  const [turn, setTurn] = useState(false);
  const [winner, setWinner] = useState();
  const { room } = useGamePageContext();
  const navigate = useNavigate();


  const username = mainUser.username;

  const RestartGame = () => {
    setTurn(false);
    socket.emit("GamePicked", gameName, room);
  };

  const GoToGameMenu = () => {
    socket.emit("ReturnToGameSelection",room);
  };
  
  const GoHome = () => {
    navigate("/home");
  }

  useEffect(() => {
    socket.on("You'reFirst", () => {
      console.log("ImFirst");
      setTurn(true);
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
        <span className={winner ? "notRelevent" : "turns"}>turn:</span>
        <span id={winner ? "notRelevent" : turn ? "player1" : "player2"}>
          {turn ? "your" : "opps"}
        </span>
        <span className="GameButtons">
          {" "}
          <button onClick={RestartGame}>Restart Game</button>
          <button onClick={GoToGameMenu}>Games Menu</button>
          <button onClick={GoHome}>Home</button>
        </span>
        <br />
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

import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";
import { useGamePageContext } from "../contexts/GamePageContext";
import "../styles/componentsStyles/Tictactoe.css"; 



const Tictactoe = ({yourTurn}) => {
  const [grid, setGrid] = useState(['', '', '', '', '', '', '', '','']); 
  const [winCondition, setWinCondition] = useState();
  const [winner, setWinner] = useState();
  const { room } = useGamePageContext();

  const cellClicked = (slot) => {
    socket.emit("TurnTakenTTT", room, slot);
  }


  useEffect(() => {
    socket.on("UpdateBoard", (board) => {
      setWinCondition();
      setWinner();
      setGrid(board);
    });
    socket.on("Tie", () => {
      setWinCondition("tie");
    });
    socket.on("Win", (winCondition, currentPlayer) => {
      setWinner(currentPlayer);
      setWinCondition(winCondition);
    });


  }, [winCondition, winner])


  return (
      <div className="grid">
        {grid.map((cell, index) => (
          <div key={index} 
          className={`tictactoeCell ${winCondition && winCondition.includes(index) ? 'winningCells' :
            cell === '' ? 'unchecked' : 
            cell === 'X' ?'checkedX' : 'checkedO'}`}
            onClick={yourTurn && !winCondition && cell === '' ? () => cellClicked(index) : null}>
            {cell} 
          </div>
        ))}
      </div>
  )
}

export default Tictactoe
// {winCondition} ? ({winCondition === "tie"} ? <h1>Its A Tie. Game Over</h1> : <h1>{`Player ${winner} Won The Game`}</h1>) :
//"tictactoeCell unchecked"
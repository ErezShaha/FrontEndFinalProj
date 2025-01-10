import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";
import { useGamePageContext } from "../contexts/GamePageContext";
import "../styles/componentsStyles/MemoryGame.css"; 


const MemoryGame = ({yourTurn}) => {
  const [grid, setGrid] = useState([]); 
  const [slotOne, setSlotOne] = useState();
  const [slotTwo, setSlotTwo] = useState();
  const [player, setPlayer] = useState("Player Two");
  const [gameEnded, setGameEnded] = useState(false);
  const { room } = useGamePageContext();
  

  const cellClicked = (slot) => {
    !slotOne ? setSlotOne(slot) : 
    !slotTwo ? (setSlotTwo(slot),
      socket.emit("TurnTakenTTT",room, slotOne, slotTwo),
      setSlotOne(),
      setSlotTwo() ):
    null;
  }


  useEffect(() => {
    socket.on("You'reFirst", () => {
      setPlayer("Player One")
    })
    socket.on("UpdateBoard", (board) => {
      setGrid(board);
    });

    socket.on("Tie", () => {
      setGameEnded(true);
    });
    socket.on("Win", (a, b) => {
      setGameEnded(true);
    });

  }, [])
  

  return (
    <div className="mgGrid">
        {grid.map((cell, index) => (
          <div key={index} 
          style={{backgroundColor: cell !== '' ? cell.color : null}}
          className={`memoryGameCell ${cell !== '' ? (cell.player === player ? "myCell" : "yourCell") : null}`}
          onClick={gameEnded || !yourTurn ? null : () => cellClicked(index)}>
          </div>
        ))}
      </div>
  )
}

export default MemoryGame

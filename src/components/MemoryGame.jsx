import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";
import { useGamePageContext } from "../contexts/GamePageContext";
import "../styles/componentsStyles/MemoryGame.css"; 


const MemoryGame = ({yourTurn}) => {
  const [grid, setGrid] = useState(['', '', '', '', '', '', '', '','','','','','','','','']);
  const [selectedSlots, setSelectedSlots] = useState({}) 
  const [player, setPlayer] = useState("Player Two");
  const [gameEnded, setGameEnded] = useState(false);
  const { room } = useGamePageContext();
  

  const cellClicked = (index) => {
    if (Object.keys(selectedSlots).length < 2){
      socket.emit("LookAtSlot", room, index);
    }    
  }


  useEffect(() => {
    socket.on("You'reFirst", () => {
      setPlayer("Player One")
    });

    socket.on("RevealedSlot", (slotColor, index) => {
      setSelectedSlots({...selectedSlots, [index]: slotColor});
    });

    socket.on("UpdateBoard", (opendSlots) => {
      setGameEnded(false);
      setSelectedSlots({});
      setGrid(opendSlots);
    });

    socket.on("Tie", () => {
      setGameEnded(true);
    });

    socket.on("Win", (a, b) => {
      setGameEnded(true);
    });

    socket.on("NextTurn", () => {
      setSelectedSlots({});
    })
    
    if (Object.keys(selectedSlots).length === 2 && yourTurn){
      console.log("TurnTakenMG");
      socket.emit("TurnTakenMG", room, Object.keys(selectedSlots));
      
    }
  }, [grid, selectedSlots])

  return (
    <div className="mgGrid">
      {grid.map((cell, index) => (
        <div key={index} 
        style={
          {transition: 
            ['transform 0.5s ease', 'background-color 0.3s ease',
              `background-color ${Object.keys(selectedSlots).length === 2 ? ' 0.3s ease-out' : null}`
            ],
            backgroundColor: 
            cell !== '' ? cell.color : 

            selectedSlots[index] ? selectedSlots[index] :
            null
          }
        }
        className={`memoryGameCell ${cell !== '' ? (cell.player === player ? "myCell" : "yourCell") : "unselected"}`}
        onClick={gameEnded || !yourTurn ? null : () => cellClicked(index)}>
        </div>
      ))}
    </div>
  )
}

export default MemoryGame
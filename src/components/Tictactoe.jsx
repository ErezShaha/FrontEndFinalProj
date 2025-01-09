import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";


const Tictactoe = () => {
  const [grid, setGrid] = useState(['', '', '', '', '', '', '', '','']); 

  const cellClicked = (slot) => {
    socket.emit("TurnTaken", slot);
  }


  useEffect(() => {
    socket.on("InvalidAction", () => {
      console.log("InvalidAction");
    })
    socket.on("InvalidAction", () => {
      console.log("InvalidAction");
    })


  }, [])


  return (
    <div className="grid">
      {grid.map((cell, index) => (
        <div key={index} className="tictactoeCell unchecked" onClick={() => cellClicked(index)}>
          {cell} 
        </div>
      ))}
    </div>
  )
}

export default Tictactoe
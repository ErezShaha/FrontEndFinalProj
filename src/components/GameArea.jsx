import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";
import { useGamePageContext } from "../contexts/GamePageContext.jsx";


const GameArea = ({ gameName }) => {
  
  const {room} = useGamePageContext();
  useEffect(() => {


  }, [])
    console.log(room);
  return (
    <div>
      <h1>{room}</h1>
      <div className="player1">player 1</div>
      <div className="player2">player 2</div>
      <div className="turns">who's turn is it?</div>
      {/* {gameName === 'exegool' ? <Exegool /> : <Zikaron/>} */}
    </div>
  )
}

export default GameArea
import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";
import { useGamePageContext } from "../contexts/GamePageContext.jsx";
import Tictactoe from "./Tictactoe.jsx";
import MemoryGame from "./MemoryGame.jsx";
import "../styles/componentsStyles/GameArea.css"



const GameArea = ({ gameName }) => {
  
  const {room} = useGamePageContext();
  useEffect(() => {


  }, [])
    console.log(room);
  return (
    <div>
      <div className="GameTitle" id="player1">player 1</div>
      <h1 className="GameTitle" >{room}</h1>
      <div className="GameTitle"  id="player2">player 2</div>
      <div className="turns">who's turn is it?</div>
      {gameName === 'exegool' ? <Tictactoe /> : <MemoryGame/>}
    </div>
  )
}

export default GameArea
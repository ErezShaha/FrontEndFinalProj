import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";

const GameArea = ({ gameName }) => {
  

  useEffect(() => {


  }, [])
    
  return (
    <div>
      {gameName === 'exegool' ? <Exegool /> : <Zikaron/>}
    </div>
  )
}

export default GameArea
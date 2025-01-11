import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";
import { useGamePageContext } from "../contexts/GamePageContext";
import "../styles/componentsStyles/MemoryGame.css";

const MemoryGame = ({ yourTurn }) => {
  const [grid, setGrid] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [selectedSlots, setSelectedSlots] = useState({});
  const [player, setPlayer] = useState("Player Two");
  const [gameEnded, setGameEnded] = useState(false);
  const { room } = useGamePageContext();

  const cellClicked = (index) => {
    if (Object.keys(selectedSlots).length < 2) {
      socket.emit("LookAtSlot", room, index);

      // Add a class for animation (click effect)
      const cell = document.getElementById(`cell-${index}`);
      if (cell) {
        cell.classList.add("clicked");

        // Remove the class after the animation completes
        setTimeout(() => {
          cell.classList.remove("clicked");
        }, 300); // Duration of the animation
      }
    }
  };

  useEffect(() => {
    socket.on("You'reFirst", () => {
      setPlayer("Player One");
    });

    socket.on("RevealedSlot", (slotColor, index) => {
      setSelectedSlots({ ...selectedSlots, [index]: slotColor });
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
    });

    if (Object.keys(selectedSlots).length === 2 && yourTurn) {
      console.log("TurnTakenMG");
      socket.emit("TurnTakenMG", room, Object.keys(selectedSlots));
    }
  }, [grid, selectedSlots]);

  return (
    <div className="mgGrid">
      {grid.map((cell, index) => (
        <div
          key={index}
          id={`cell-${index}`} // Unique ID for each cell
          style={{
            transition: [
              "transform 0.5s ease",
              "background-color 0.3s ease",
              Object.keys(selectedSlots).length === 2
                ? "background-color 0.3s ease-out"
                : null,
            ],
            backgroundColor:
              cell !== ""
                ? cell.color
                : selectedSlots[index]
                ? selectedSlots[index]
                : null,
          }}
          className={`memoryGameCell ${
            cell !== ""
              ? cell.player === player
                ? "myCell"
                : "yourCell"
              : "unselected"
          }`}
          onClick={gameEnded || !yourTurn || cell!== "" ? null : () => cellClicked(index)}
        />
      ))}
    </div>
  );
};

export default MemoryGame;

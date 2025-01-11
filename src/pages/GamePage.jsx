import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import GameArea from "../components/GameArea.jsx";
import DirectMessage from "../components/DirectMessage.jsx";
import { GamePageContext } from "../contexts/GamePageContext.jsx";
import "../styles/pageStyles/GamePage.css";

const GamePage = () => {
  const { room } = useParams();

  const navigate = useNavigate();
  const [bothHere, setBothHere] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const selectGame = (gameName) => {
    setSelectedGame(gameName);
    socket.emit("GamePicked", gameName, room);
  };

  const GoHome = () => {
    navigate("/home");
  }

  useEffect(() => {
    axios
      .post("/api/v1/users/verifyToken", null, { withCredentials: true })
      .then((res) => {
        console.log(res);
        socket.emit("CheckLoggedin", res.data);
        socket.emit("JoinAndLoadRoom", room, window.location.href);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  
      

    socket.on("AreYouHereToPlay", (otherUserLocation) => {
        setSelectedGame(false);
      if (otherUserLocation === window.location.href) {
        socket.emit("ImHereLetsGo", room);
      }
    });

    socket.on("MoveToGame", (gamePicked) => {
      setSelectedGame(gamePicked);
    });

    socket.on("BothHere", () => {
      if (!bothHere) {
        setBothHere(true);
      }
    });

    socket.on("NewPageNewMe", () => {
        setBothHere(false);
    })
  }, []);
  return (
    <GamePageContext.Provider value={{ room }}>
      <div className="gameDiv">
        <div>
          {bothHere ? (
            selectedGame ? (
              <GameArea gameName={selectedGame} />
            ) : (
              <div className="gamePageCenter">
                <span className="GameButtons"><button onClick={GoHome}>Home</button></span>
                <h1>Choose Game</h1>
                <button className="ttt" onClick={() =>selectGame("Tictactoe")}>
                  Tictactoe
                </button>
                <br />
                <button className="memory" onClick={() => selectGame("MemoryGame")}>
                  Memory Game
                </button>
              </div>
            )
          ) : (
            <div>
              <h1>Waiting for the other player...</h1>
              <span className="GameButtons"><button onClick={GoHome}>Home</button></span>
            </div>
          )}
        </div>
        <DirectMessage />
      </div>
    </GamePageContext.Provider>
  );
};

export default GamePage;

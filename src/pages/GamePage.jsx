import { useEffect, useState } from "react";
import { socket } from "../utils/socket.js";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import GameArea from "../components/GameArea.jsx";
import DirectMessage from "../components/DirectMessage.jsx";
import { GamePageContext } from "../contexts/GamePageContext.jsx";
import "../styles/GamePage.css";



const GamePage = () => {
  const { room } = useParams();

  const navigate = useNavigate();
  const [bothHere, setBothHere] = useState(false);
  const [selectedGame, setSelectedGame] = useState();

    const selectGame = (gameName) => {
        setSelectedGame(gameName);
        socket.emit("GamePicked", gameName, room);
    }
    
  useEffect(() => {
    axios
      .post("/api/v1/users/verifyToken", null, { withCredentials: true })
      .then((res) => {
        console.log(res);
        socket.emit("CheckLoggedin", res.data);
        socket.emit("JoinAndLoadRoom", room);
        socket.emit("StartGameRoom", room, window.location.href);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });

    socket.on("AreYouHereToPlay", (otherUserLocation) => {
      if (otherUserLocation === window.location.href) {
        socket.emit("ImHereLetsGo", room);
      }
    });
    socket.on("BothHere", () => {
      if (!bothHere) {
        setBothHere(true);
      }
    });
  }, []);
  return (
    <GamePageContext.Provider value={{room}}>
        <div className="gameDiv">
        <div >
            {bothHere ? 
                {selectedGame} ? 
                    <GameArea gameName={selectedGame}/> 
                    : (
                    <div className="gamePageCenter">
                        <h1>good morning assaf</h1>
                        <button className="exegool" onClick={selectGame(exegool)}>ex egool</button>
                        <br />
                        <button className="zikaron" onClick={selectGame(zikaron)}>mishak ha-zikaron</button>
                    </div>
            ) : (
            <h1>Waiting for the other player...</h1>
            )}
        </div>
        <DirectMessage />
        </div>
     </GamePageContext.Provider>
  );
};

export default GamePage;

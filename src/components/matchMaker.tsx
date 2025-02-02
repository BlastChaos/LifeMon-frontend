import { useState, useEffect, useContext } from "react";
import { WebSocketsContext } from "../types";
import { useNavigate } from "react-router";

const Matchmaker = () => {
  const [match, setMatch] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const navigate = useNavigate();

  const connection = useContext(WebSocketsContext);

  useEffect(() => {
    connection?.on("MatchFound", (matchedPlayerId) => {
      console.log("matchFound");
      setMatch(matchedPlayerId);
      setWaiting(false);
      alert(`You have been matched with player: ${matchedPlayerId}`);
      navigate(`/battle/${matchedPlayerId}`);
    });

    connection?.on("WaitingForMatch", () => {
      setWaiting(true);
      alert("Waiting for another player...");
    });
    return () => {
      connection?.off("MatchFound");
      connection?.off("WaitingForMatch");
    };
  }, [connection, navigate]);

  const handleLogin = (login2?: boolean) => {
    const user1 = "679ea994ed732de174df4795";
    const user2 = "679ebe03c5a5786587c26dc4";

    if (connection) {
      const playerId = login2 ? user2 : user1;
      connection.invoke("Login", playerId);
      setWaiting(true);
    }
  };

  return (
    <div>
      <button onClick={() => handleLogin(false)}>Login 1</button>
      <button onClick={() => handleLogin(true)}>Login 2</button>
      {waiting && <p>Waiting for another player...</p>}
      {match && <p>You've been matched with: {match}</p>}
    </div>
  );
};

export default Matchmaker;

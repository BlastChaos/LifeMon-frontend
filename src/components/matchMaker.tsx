import { useState, useEffect } from "react";
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

const Matchmaker = () => {
  const [connection, setConnection] = useState<HubConnection>();
  const [match, setMatch] = useState(null);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug) // add this for diagnostic clues
      .withUrl("http://localhost:5252/matchmaking", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      }) // Your server URL
      .build();

    connect
      .start()
      .then(() => {
        console.log("Connected to the matchmaking hub");
      })
      .catch((err) => console.log("Connection failed: ", err));

    setConnection(connect);

    connect.on("MatchFound", (matchedPlayer) => {
      console.log("matchFound");
      setMatch(matchedPlayer);
      setWaiting(false);
      alert(`You have been matched with player: ${matchedPlayer}`);
    });

    connect.on("WaitingForMatch", () => {
      setWaiting(true);
      alert("Waiting for another player...");
    });
  }, []);

  const handleLogin = () => {
    if (connection) {
      const playerId = "Player_" + Math.floor(Math.random() * 1000); // Generate random player ID for demo
      connection.invoke("Login", playerId);
      setWaiting(true);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      {waiting && <p>Waiting for another player...</p>}
      {match && <p>You've been matched with: {match}</p>}
    </div>
  );
};

export default Matchmaker;

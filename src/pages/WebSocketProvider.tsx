import {
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { PropsWithChildren } from "react";
import { config } from "../config";
import { WebSocketsContext } from "../types";

export const WebSocketsProvider: React.FC<PropsWithChildren> = (props) => {
  const connect = new HubConnectionBuilder()
    .configureLogging(LogLevel.Debug) // add this for diagnostic clues
    .withUrl(`${config.apiUrl}/matchmaking`, {
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

  return (
    <WebSocketsContext.Provider value={connect}>
      {props.children}
    </WebSocketsContext.Provider>
  );
};

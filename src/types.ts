import { HubConnection } from "@microsoft/signalr";
import { createContext } from "react";

export const WebSocketsContext = createContext<HubConnection | null>(null);

export type Lifemon = {
  url: string;
};

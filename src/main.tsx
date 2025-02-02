import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WebSocketsProvider } from "./pages/WebSocketProvider.tsx";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({});
export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <WebSocketsProvider>
          <Notifications />
          <App />
        </WebSocketsProvider>
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>
);

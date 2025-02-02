import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WebSocketsProvider } from "./pages/WebSocketProvider.tsx";

const theme = createTheme({});
export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <WebSocketsProvider>
          <App />
        </WebSocketsProvider>
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>
);

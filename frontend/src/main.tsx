import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  </QueryClientProvider>
);

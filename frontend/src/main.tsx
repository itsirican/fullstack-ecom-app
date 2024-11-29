import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import InternetConnectionProvider from "./providers/InternetConnectionProvider.tsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <InternetConnectionProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </Router>
      </QueryClientProvider>
    </InternetConnectionProvider>
  </Provider>
);

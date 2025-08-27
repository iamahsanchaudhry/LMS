import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { appStore } from "./app/store";
import App from "./App";
import { Toaster } from "@/components/ui/sonner";
import LoadingSpinner from "./components/LoadingSpinner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={appStore}>
      <LoadingSpinner>
        <App />
        <Toaster />
      </LoadingSpinner>
    </Provider>
  </StrictMode>
);

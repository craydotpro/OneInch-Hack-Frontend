import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./constants/index.tsx";
import { AppKitProvider } from "./providers/app_kit.tsx";
import { Toaster } from "@/components/ui/sonner";
import PopupHandler from "./lib/popup_handler/index.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppKitProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="">
          <App />
          <Toaster />
          <PopupHandler />
        </BrowserRouter>
      </QueryClientProvider>
    </AppKitProvider>
  </StrictMode>
);

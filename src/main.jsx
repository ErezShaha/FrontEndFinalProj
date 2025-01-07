import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TestPage from './pages/TestPage';
import GamePage from './pages/GamePage';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStateProvider } from "./contexts/GlobalContext";
import "./styles/index.css"

axios.defaults.baseURL = "http://localhost:8080";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStateProvider>
      <BrowserRouter>
      <div >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/test" element={<TestPage/>} />
          <Route path="/game/:room" element={<GamePage/>} />
        </Routes>
      </div>
      </BrowserRouter>
    </GlobalStateProvider>
  </StrictMode>
);

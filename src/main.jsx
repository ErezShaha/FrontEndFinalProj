import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = "http://localhost:8080";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/home" element={<HomePage/>} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
);

import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import MainRoutes from "./routes";
import Navbar from "./components/auth/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <MainRoutes />
    </BrowserRouter>
  );
}

export default App;

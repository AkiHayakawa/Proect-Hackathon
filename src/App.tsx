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
  const navigate = useNavigate();
  const registrId = localStorage.getItem("registr-id");
  const location = useLocation();

  useEffect(() => {
    if (!registrId && location.pathname == "/") {
      navigate("/registr");
    }
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <MainRoutes />
    </BrowserRouter>
  );
}

export default App;

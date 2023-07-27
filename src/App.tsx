import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, useNavigate } from "react-router-dom";
import MainRoutes from "./routes";
import Navbar from "./components/auth/Navbar";

function App() {
  // новая ветка
  console.log("prefer");
  return (
    <BrowserRouter>
      <Navbar />
      <MainRoutes />
    </BrowserRouter>
  );
}

export default App;

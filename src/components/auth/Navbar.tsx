import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("registr-id");
  useEffect(() => {
    if (!userId && location.pathname == "/") {
      navigate("/registr");
    }
  }, []);
  return <div className="navbar-auth">navbar</div>;
};

export default Navbar;

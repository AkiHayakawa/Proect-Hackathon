import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("registr-id");
  const location = useLocation();

  useEffect(() => {
    if (!userId && location.pathname == "/") {
      navigate("/registr");
    }
  }, []);
  return <div className="navbar-auth">navbar</div>;
};

export default Navbar;

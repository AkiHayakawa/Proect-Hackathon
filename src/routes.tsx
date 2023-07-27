import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Registr from "./components/auth/Registr";
import ActivateUser from "./components/auth/ActivateUser";
import RegistrDetails from "./components/auth/RegistrDetails";
import ForgotPass from "./components/auth/ForgotPass";
import ChangePass from "./components/auth/ChangePass";

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    {
      link: "/login",
      element: <Login />,
      id: 1,
    },
    {
      link: "/registr",
      element: <Registr />,
      id: 2,
    },
    {
      link: "/activate-account",
      element: <ActivateUser />,
      id: 3,
    },
    {
      link: "/questionnaire-user",
      element: <RegistrDetails />,
      id: 4,
    },
    {
      link: "/forgot-pass",
      element: <ForgotPass />,
      id: 5,
    },
    {
      link: "/change-pass",
      element: <ChangePass />,
      id: 6,
    },
  ];

  return (
    <Routes>
      {PUBLIC_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id} />
      ))}
    </Routes>
  );
};

export default MainRoutes;

import React from "react";
import { useLocation } from "react-router-dom";
import Signup from "../../Components/LoginPages/Signup";
import Login from "../../Components/LoginPages/Login";

const Auth = () => {
  const { pathname } = useLocation();

  console.log(pathname);

  return <>{pathname === "/login" ? <Login /> : <Signup />}</>;
};

export default Auth;

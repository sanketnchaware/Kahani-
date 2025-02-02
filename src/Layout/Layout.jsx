import React, { Children, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Stories";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchStories } from "../features/stories";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  return (
    <div className=" w-full ">
      <Navbar />
      <ToastContainer />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;

import React from "react";
import { Outlet } from "react-router-dom";
import NavbarTop from "../Shared/Navbar/Navbar";

const Main = () => {
  return (
    <div>
      <NavbarTop></NavbarTop>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;

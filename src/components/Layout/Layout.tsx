import React from "react";
import {Outlet, useLocation} from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  const params = useLocation();
  console.log(params);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;

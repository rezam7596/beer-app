import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "../Menu";
import Offline from "../../views/Offline";
import Footer from "../Footer";
import ThemeProvider from "../ThemeProvider";

function Layout() {

  return (
    <ThemeProvider>
      <Menu>
        <Offline/>
        <Outlet/>
        <Footer/>
      </Menu>
    </ThemeProvider>
  )
}

export default Layout;

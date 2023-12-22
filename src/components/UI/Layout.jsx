import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen ">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

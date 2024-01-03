import React from "react";
import { Outlet } from "react-router-dom";

const layout = () => {
  return (
    <>
      <h1>order</h1>
      <Outlet />
    </>
  );
};

export default layout;

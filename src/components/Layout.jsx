import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const userToken = localStorage.getItem("user_token");

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {userToken ? (
        <div className="flex flex-auto">
          <Sidebar />
          <div className="grow">
            <div className="min-w-screen min-h-screen">{children}</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-auto h-screen">
          <div className="grow">
            <div className="">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;

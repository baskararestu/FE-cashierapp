import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const userToken = localStorage.getItem("user_token");

  return (
    <>
      {userToken ? (
        <div className="flex flex-auto h-screen">
          <Sidebar />
          <div className="grow">
            <div className="m-5">{children}</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-auto h-screen">
          <div className="grow">
            <div className="">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;

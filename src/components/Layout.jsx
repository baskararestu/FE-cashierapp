import React from "react";
// import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const userToken = localStorage.getItem("user_token");
  const userGlobal = useSelector((state) => state.user.user);
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

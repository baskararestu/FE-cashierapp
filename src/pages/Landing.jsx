import React from "react";
import { useSelector } from "react-redux";

function Landing() {
  const userGlobal = useSelector((state) => state.user.user);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <p className="text-xl font-bold">Welcome back,{userGlobal.username}</p>
    </div>
  );
}

export default Landing;

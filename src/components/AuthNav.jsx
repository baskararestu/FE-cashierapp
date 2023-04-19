import React from "react";
import { useNavigate } from "react-router-dom";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

function AuthNav() {
  const navigate = useNavigate();
  return (
    <div className=" fixed top-5 w-full px-20 text-gray-800 h-20">
      <div className=" mx-40  bg-gray-200 flex flex-row justify-center items-center h-12 rounded-xl gap-16 text-gray-600">
        <div>
          <KeyRoundedIcon />
          <button
            className="ml-1"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign In
          </button>
        </div>
        <div>
          <AccountCircleRoundedIcon />
          <button
            className=""
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthNav;

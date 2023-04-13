import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      <p className="bg-red-600">Landing</p>
      <div className="flex flex-row gap-5">
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="w-40 px-4 py-2 mx-2 my-2 text-white  bg-purple-700 rounded-md hover:bg-purple-600"
        >
          Login
        </button>
        <button
          onClick={() => {
            navigate("/register");
          }}
          className="w-40 px-4 py-2 mx-2 my-2 text-white  bg-purple-700 rounded-md hover:bg-purple-600"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Landing;

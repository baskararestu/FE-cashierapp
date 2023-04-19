import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/users/userSlice";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PieChartIcon from "@mui/icons-material/PieChart";
import PersonIcon from "@mui/icons-material/Person";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const location = useLocation();
  const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const Menus = [
    {
      title: "Dashboard",
      path: "/dashboard",
      src: (
        <PieChartIcon className="w-6 h-6 text-gray-500  dark:text-gray-400" />
      ),
    },
    {
      title: "Add Product",
      path: "/add-product",
      src: (
        <AddBoxRoundedIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      ),
    },
    {
      title: "Profile",
      path: "/profile",
      src: (
        <PersonIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      ),
    },
    {
      title: "Sign Out",
      path: "/login",
      src: (
        <LogoutRoundedIcon className="w-6 h-6 text-gray-500  dark:text-gray-400" />
      ),
      gap: "true",
    },
  ];

  const handleLogout = () => {
    // Perform logout action, such as clearing the user session
    // console.log("Logged out");
    dispatch(logoutUser());
  };

  return (
    <>
      <div
        className={`${
          open ? "w-60" : "w-fit"
        } hidden sm:block relative h-screen duration-300 bg-gray-100 border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-slate-800`}
      >
        <ArrowCircleRightOutlinedIcon
          className={`${
            !open && "rotate-180"
          } absolute text-3xl  fill-slate-800  rounded-full cursor-pointer top-9 -right-4 dark:fill-gray-400 dark:bg-slate-50`}
          onClick={() => setOpen(!open)}
        />
        <Link to="/dashboard">
          <div className={`flex ${open && "gap-x-4"} items-center`}>
            {/* <img src={Logo} alt="" className="pl-2" /> */}
            {open && (
              <div className="text-xl font-medium whitespace-nowrap dark:text-white">
                Cashier App
              </div>
            )}
          </div>
        </Link>

        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <Link to={menu.path} key={index}>
              {menu.title === "Sign Out" ? (
                <span
                  className="flex items-center gap-x-3 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 mt-2"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <span className="text-2xl">{menu.src}</span>
                  <span className={`${!open && "hidden"} text-2xl`}>
                    {/* <SiOpenaccess /> */}
                  </span>
                  <span className={`${!open && "hidden"}`}>{menu.title}</span>
                </span>
              ) : (
                <li
                  className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700
                        ${menu.gap ? "mt-9" : "mt-2"} ${
                    location.pathname === menu.path &&
                    "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  <span className="text-2xl">{menu.src}</span>
                  <span
                    className={`${
                      !open && "hidden"
                    } origin-left duration-300 hover:block`}
                  >
                    {menu.title}
                  </span>
                </li>
              )}
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

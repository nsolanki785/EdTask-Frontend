import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className=" bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-2xl w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            LOGO
          </span>
        </a>
        <div
          onClick={handleLogout}
          className="cursor-pointer flex text-blue-700 font-bold text-base items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
        >
          Logout
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li onClick={() => navigate("/customer/signup")}>
              <a className=" cursor-pointer block py-2 px-3 text-white bg-blue-700 rounded-sm ">
                Add Customer
              </a>
            </li>
            <li onClick={() => navigate("/admin/signup")}>
              <a className="cursor-pointer  block  py-2 px-3 text-white bg-blue-700 rounded-sm ">
                Add Admin
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

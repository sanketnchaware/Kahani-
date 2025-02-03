import { ClickAwayListener } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../userContext/userContext";

const Navbar = () => {
  const { pathname } = useLocation();
  const { auth } = useContext(UserContext);
  const [profileOptions, setProfileOptions] = useState(false);

  const isLoggedIn = auth?.isAuthenticated;

  const handleProfileOptions = () => {
    setProfileOptions((prev) => !prev);
  };

  const handleClickAway = () => {
    setProfileOptions(false);
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-full bg-white shadow-md flex items-center justify-between py-3 px-10">
      <Link to="/">Kahani.com</Link>

      <div className="flex items-center gap-4">
        {[
          { name: "Home", url: "/" },
          { name: "About", url: "/about-us" },
          { name: "Stories", url: "/stories" },
          { name: "Contact", url: "/contact-us" },
          !isLoggedIn ? { name: "Login", url: "/login" } : null,
        ]
          .filter(Boolean)
          .map((item) => (
            <Link
              key={item.url}
              className={pathname === item.url ? "underline font-bold" : ""}
              to={item.url}
            >
              {item.name}
            </Link>
          ))}

        {isLoggedIn && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className="relative">
              <div
                onClick={handleProfileOptions}
                className="flex items-center cursor-pointer"
              >
                <p>Sanket Chaware</p>
                <img
                  src="/assets/icons/downarrow.svg"
                  className="w-6 h-6 mt-1"
                  alt="downarrow"
                />
              </div>

              {profileOptions && (
                <div className="absolute right-0 w-40 bg-white border rounded-sm shadow-md mt-2">
                  <p className="flex gap-2 hover:bg-slate-100 items-center py-3 px-2 cursor-pointer">
                    <img
                      src="/assets/icons/profile.svg"
                      className="w-5 h-5"
                      alt="profile"
                    />
                    Profile
                  </p>
                  <p className="flex gap-2 hover:bg-slate-100 items-center py-3 px-2 cursor-pointer">
                    <img
                      src="/assets/icons/logout.svg"
                      className="w-5 h-5"
                      alt="logout"
                    />
                    Logout
                  </p>
                </div>
              )}
            </div>
          </ClickAwayListener>
        )}
      </div>
    </div>
  );
};

export default Navbar;

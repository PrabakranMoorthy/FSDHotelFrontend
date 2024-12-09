import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="h-[50px] bg-[#18b2a0] flex justify-center">
      <div className="w-full max-w-[1024px] text-white flex items-center justify-between">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="font-semibold">VENS HAPPY BOOKING</span>
        </Link>
        {user ? (
          user.username
        ) : (
          <div className="navItems">
            <button className="ml-[20px] border-none p-[5px_10px] cursor-pointer text-[#003580]">Register</button>
            <button className="ml-[20px] border-none p-[5px_10px] cursor-pointer text-[#003580]">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;

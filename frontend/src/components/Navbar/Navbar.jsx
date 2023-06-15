import React, { useEffect } from "react";
import { useState } from "react";
import { account } from "../../services/appwriteConfig.js";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUser = async () => {
    try {
      const data = await account.get();
      console.log(data);
      setUserDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userDetails]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
        await account.deleteSession("current");
        setUserDetails(null);
        // refresh the window
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
    };


  const displayUser = () => {
    if (userDetails) {
      return (
        <div className="flex flex-col ml-2">
          <div className="text-sm font-medium text-white">
            {userDetails.name}
          </div>
          <div className="text-xs font-normal text-gray-400">
            {userDetails.email}
          </div>
          <div className="text-sm font-medium text-white" onClick={(e) => handleLogout(e)}>Logout</div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col ml-2">
          <div className="text-sm font-medium text-white">
            <a className="p-4" href="/login">Login</a>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className="flex justify-between items-center h-16 bg-black text-white relative shadow-sm font-mono"
      role="navigation"
    >
      <Link to='/'><div className="pl-8 text-sky-400">Pathfinder</div></Link>
      <div className="pr-8 md:block hidden">
        <div className="flex items-center">
          <div className="flex flex-row-reverse">
            <div className="flex items-center cursor-pointer">
              {displayUser()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

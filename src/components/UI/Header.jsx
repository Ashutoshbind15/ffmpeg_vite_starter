import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="sticky top-0 p-2 text-white font-semibold text-xl flex items-center justify-between w-full z-20">
      <div>
        <Link to="/">VIndexer</Link>
      </div>

      <div className="flex items-center">
        <Link to="/app" className="px-2">
          App
        </Link>
        <Link to="/temp" className="px-2">
          Test
        </Link>
        <Link to="/app" className="px-2">
          App
        </Link>
      </div>
    </div>
  );
};

export default Header;

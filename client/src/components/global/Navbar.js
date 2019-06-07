import React from "react";
import { FaIdCardAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        {icon} {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: <FaIdCardAlt />
};

export default Navbar;

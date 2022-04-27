import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Dropdown from "./Dropdown"

export default function Navbar() {
  return (
    <>
    <nav className="shadow-xl py-3">
      <div className="md:flex md:justify-between md:w-9/12 md:m-auto">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>

        <div>
          <Dropdown />
        </div>
      </div>
    </nav>
    </>
  );
};


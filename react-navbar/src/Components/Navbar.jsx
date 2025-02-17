import React from "react";
import { FaBars } from "react-icons/fa";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="container">
          <a href="/">
            <img src="./public/logo.png" alt="logo" width={30} height={30} />
          </a>
          <button className="nabar-toggle">
            <FaBars className="toggle-icon" />
          </button>
          <div className="navbar-link show-container">
            <nav className="navbar-center">
              <ul className="navbar-header">
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="">Home</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

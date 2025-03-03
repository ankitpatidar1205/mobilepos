// import React from 'react'
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Header = () => {
  return (
    <>
      {/* navbar code start */}
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <Link
            className="navbar-brand custom-navbar-brand text-light fs-3"
            to="/dashboard"
          >
            POS
          </Link>

          <div className="">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown mydropnav">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span style={{ color: "white" }}>
                    <i className="fa-solid fa-user"></i>
                  </span>
                </Link>
                <ul
                  className="dropdown-menu nav-drop1"
                  aria-labelledby="userDropdown"
                  style={{ marginLeft: "-100px", padding: "8px 6px" }}
                >
                  <li>
                    <Link className="dropdown-item custom-dropdown-item">
                      <i className="fa fa-user" /> Your Profile
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item custom-dropdown-item" to="/">
                      <i className="fa fa-sign-out-alt" /> Log out
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

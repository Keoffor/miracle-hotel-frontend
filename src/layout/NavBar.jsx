import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./../index.css";
import Logout from "../components/auth/Logout";
import { AuthContext } from "../components/auth/AuthProvider";

const NavBar = () => {
  const [showAccount, setShowAccount] = useState(false);

  const { user } = useContext(AuthContext);

  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };
  const isLoggedIn = user !== null;
  const userRole = localStorage.getItem("userRole");
  const currentUser = localStorage.getItem("firstName")

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow px-5 fixed-top">
      <div className="container-fluid ">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="hotel-color"> Miracle Hotel</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={"/browse-all-rooms"}
              >
                Browse All Rooms
              </NavLink>
            </li>
            {isLoggedIn && userRole === "ROLE_ADMIN" && (
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="d-flex navbar-nav">
            {currentUser && (
                 <span className="text-success mt-3">Hi {currentUser}</span>
              
            )}
            <li className="nav-item">
              <NavLink className="nav-link " to={"/find-booking"}>
                Find My Booking
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${
                  showAccount ? "show" : ""
                }`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleAccountClick}
              >
                {""}
                Account
              </a>
              <ul
                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                aria-labelledby="navbarDropdown"
              >
                {isLoggedIn ? (
                  <li>
                    <Logout />
                  </li>
                ) : (<>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                    
                    <li>
                      <Link to={"/login"} className="dropdown-item">
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

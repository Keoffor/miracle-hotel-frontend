import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./../index.css";
import Logout from "../components/auth/Logout";
import { AuthContext } from "../components/contextProviders/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../components/contextProviders/CartProvider";

const NavBar = () => {
  const [showAccount, setShowAccount] = useState(false);

  const { user } = useContext(AuthContext);
  const {cartItems} = useContext(CartContext);


  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };
  const userRole = localStorage.getItem("userRole");
  const currentUser = localStorage.getItem("firstName");

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow px-5 fixed-top">
      <div className="container-fluid ">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEv0lEQVR4nO2Xf1BUVRTHN0v78UeNMw3vrVrYL+JdmCYzNHnXkCQYxQIx0rSwYiyMcsYooSbxFxhIK8ECwghBFg6RSOGPEEoJIdh1VVzXXfa9e6jF0Zpmqv/qj9LT3Le7KG6BrqwyI2fmO+/ec+4997Pn3ru7T6cbAVMU5VbG2DoAyFMU5U7d9TYAiOnr64vjbcZYEAAUAwAyAASAOkVRpnjG0b6+vmcR8aaAArlcrkmIOM5ms00AgAwOowExVskY+4u3vzX3Yn2b3ev/BwDKGWPnPf2CM2fO3MFzOZ3OySMKBwDbPIt0McYcvP1DjxPbjzk1GK6K/Scx+WMTJm01oeGrE95K4jGbii2mXi/0WcZYs6fddNVgiqIQALDyKnQevwDTau7FZUazpuZu9+J2J8N5+d0Yl9eF3ScUzXf4mBNfLjuCi4tM2HjYMTD/olyMMSb7DcgYM/JEO1ptuKTYhGX7rOhwMi15SukRXGo0Dyxqdaj4RZsdmzocaLKqA/607RZcVGhClYGmqgM2XFxkxspmm9YHgEa/AVVVTeDVqzt0SqtMXkPPwMLHT6maGIAG9HmrFddUfo9vV7RhdfNxrUqMuceddKjoVN0frHz/SS0Xf3pyveEXXH9//+0AUAQAf/Otajvaq52lE3YVG9vtuPGzTkzd2oLJG3Zj7KpSlOavxCmPzcPJjz6ND8W8irNTCzAxux5TtuzHrMo2rD9k1c7jQYv77B484j4aAFDjcrkmXjEgYyzNe94KG8y4suQ7fGFzEy5YU43TFr2DwU8kokjoZemeiAVI4t/EOelGTFrfgKmFBzC3tgP3dp7SdoAxluMP4FoOmLRpD95Hn0d9eNRlA4nDSB8+G6dGPofx2Y2oqFoVy/0GXLTuyxEDEy9RfOaOGwgwIzsfL7WGvS1aLMewzSdWVbtLi5VU1vrEDGXVY4Cjr4LL07PQ0mMbpI9KP9Fi6ZkbfWLr8o1aLGuTwSeWkZ13A16SGbHJuGL12kGat3iFFpPjl/rE5ia9osWiE1N8Yk8+8+LYJRl9lyRjtH8PRiem4PotJYO0LO3dYQETXkr3mbdgadq1vcU5QwCOit/inDHAISq4cMNuvHdGwpDK2lyKP53+eZAMFTuHnRf/ft1VbXEmByzc1Y0bd7QHRHl1Xagyxv9RG68YUFXVBwHgtPclKVBijP0GABE6fwwRb+YvNF49PDPug+BpT9VwLUld9YjXb9hWM3nqtLnV3E8i578VEhGb6x03N2H5nIXLVkZ4+w88Hrv14pwWi2W8bqSMEDJBlCgTCP1TkOT1Xr9I5OUCkX8ViXxWFxV1S3Bw1G0ioedEidYOjJHkYn7jg8JnCrpAmkDko6JEm0Qi/6jT6ca5fXSfINEGQZL7L0DTcyKhVRfm0QIOOPH+mLsCDxgmJ/HFhLDI6EmhNEQk8nZRkndeCihI8jdBEo3hEgmtv2aAuunTx4sS/UUg9FNRoh8GhUbO+h/ADj2hr3GJhLZcO0D3udsiSPIfokS/1vr/AXjdtpg/3VtLz4uErh41gAKhm/hNFYj8ngdqjz4k6m592Ow4gchOvu0ikV8XiZwrSPR3QZLt+lA6XR8+K1SUaI/mI3JZwADHbMx0gbF/AQd+SMpipVDdAAAAAElFTkSuQmCC"
            alt="5-star-hotel"
          />
          <span className="hotel-color py-5"> Miracle Hotel</span>
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
            {user && userRole === "ROLE_ADMIN" && (
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
                <FontAwesomeIcon icon={faUser} className="cart-i" /> Account
              </a>
              <ul
                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                aria-labelledby="navbarDropdown"
              >
                {user ? (
                  <li>
                    <Logout />
                  </li>
                ) : (
                  <>
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
            {user && (
              <li className="nav-item dropdown">
                <Link to={"/checkout"}>
                  <div className="mt-2 nav-cart">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="25"
                      className="bi bi-cart2 cart-icon"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                    </svg>
                    <span className="cart-quanity">
                      <span>{cartItems.length}</span>
                    </span>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

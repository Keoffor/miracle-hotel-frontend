import React, { useContext } from "react";
import { AuthContext } from "../contextProviders/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.handleLogout();
    // window.location.reload();
    navigate("/", { state: { message: "You have been logged out! " } });
  };

  const isLoggedIn = auth.user !== null;
  return isLoggedIn ? (
    <>
    <ul className="list-unstyled">

      <li>
        <Link to={"/profile"} className="dropdown-item">
          Profile
        </Link>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <button className="dropdown-item" onClick={handleLogout}>
          Logout
        </button>
      </li>
      </ul>
    </>
  ) : null;
};

export default Logout;

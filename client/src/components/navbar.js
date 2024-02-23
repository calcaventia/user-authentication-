import React from "react";
import "../Styles.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import logo from "../images/Logo.png";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div>
          <NavLink to="/dashboard">
            <img src={logo} alt="logo" className="logo mt-2" />
          </NavLink>
        </div>

        {isAuth ? (
          <div>
            <NavLink to="/dashboard" className="mx-3 dashboard-link">
              <span>Dashboard</span>
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink to="/login" className="mx-3">
              <span>Login</span>
            </NavLink>
            <NavLink to="/register" className="mx-3">
              <span>Register</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

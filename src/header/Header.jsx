/** @format */

import React from "react";
import "./Header.scss";

const Header = ({ showLogOut, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <header>
      <div className="page-header">
        <div className="float-md-left">
          <h3>Daily Status</h3>
        </div>
        <div className="float-md-right">
          {showLogOut && (
            <>
              <span className="userName">Hello, {JSON.parse(localStorage.getItem("user")).name}</span>
              <button
                className="btn btn-primary btn-inline"
                onClick={handleLogout}
              >
                <i className="fa fa-sign-out"></i>Log out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

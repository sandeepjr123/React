/** @format */

import React from "react";

import Login from "../Login/Login";
import Header from "../header/Header";
import LoadingIndicator from "../spinner/LoadingIndicator";
import serviceClient from "../serviceClient";
import Register from "../Login/Register";
import Dashboard from "../DashBoard/Dashboard";

const AppContainer = () => {
  const [showLogin, shouldShowLogin] = React.useState(false);
  const [showRegister, shouldShowRegister] = React.useState(false);
  const [showDashboard, shouldShowDashboard] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [showLogOut, setShowLogout] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const verifyAuth = async () => {
      try {
        const response = await serviceClient.get("/verifyAuth", "");
        if (response && response.message) {
          shouldShowLogin(false);
          shouldShowDashboard(true);
          setShowLogout(true);
        } else {
          shouldShowLogin(true);
        }
        setLoading(false);
      } catch (err) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        setLoading(false);
        shouldShowLogin(true);
      }
    };

    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
      verifyAuth();
    } else {
      shouldShowLogin(true);
      setLoading(false);
    }
  }, []);

  const handleRegister = () => {
    shouldShowLogin(false);
    shouldShowRegister(true);
  };

  const handlePasswordReset = () => {};

  const handleSuccessfullLogin = () => {
    shouldShowLogin(false);
    shouldShowDashboard(true);
    setShowLogout(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  return (
    <>
      <Header showLogOut={showLogOut} onLogout={handleLogout}/>
      <div className="container">
        {isLoading && <LoadingIndicator />}
        {!isLoading && showLogin && (
          <Login
            onRegisterClick={handleRegister}
            onPasswordResetClick={handlePasswordReset}
            onLoginSuccess={handleSuccessfullLogin}
          />
        )}
        {!isLoading && showRegister && (<Register/>)}
        {!isLoading && showDashboard && (<Dashboard />)}
      </div>
    </>
  );
};

export default AppContainer;

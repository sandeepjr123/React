/** @format */

import React, { useState } from "react";
import serviceClient from "../serviceClient";
import LoadingIndicator from "../spinner/LoadingIndicator";
import Alert from "../alerts/Alert";

const Login = ({ onRegisterClick, onPasswordResetClick, onLoginSuccess }) => {
  const [isLoading, setLoading] = React.useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  }) 
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    onRegisterClick();
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCredentials({...credentials, [name]: value});
  }

  const handlePasswordReset = () => {
    onPasswordResetClick();
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if(!credentials.email || !credentials.password){
      setMessage("Email or Password is empty !!");
      return;
    }
    setLoading(true);
    const requestBody = { userId: credentials.email, password: credentials.password };
    try {
      const apiResponse = await serviceClient.post("/login", requestBody);

      if (apiResponse) {
        localStorage.setItem("auth_token", "Bearer " + apiResponse.authToken);
        localStorage.setItem("user", JSON.stringify(apiResponse.userDetail));
      }
      onLoginSuccess();
    } catch (err) {
      setLoading(false);
      setMessage(err.message);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
              {message && <Alert alertType="ERROR" message={message} />}
              <form className="form-signin" onSubmit={handleLogin}>
                <div className="form-label-group">
                  <label>Email address</label>
                  <input
                    value={credentials.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                  />
                </div>

                <div className="form-label-group">
                  <label>Password</label>
                  <input
                    value={credentials.password}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>

                <div className="custom-control custom-checkbox mb-3"></div>
                {isLoading && <LoadingIndicator />}
                {!isLoading && (
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Sign in
                  </button>
                )}
              </form>
              <div style={{ textAlign: "center" }}>
                <button
                  type="button"
                  className="btn card-title text-center btn-link"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useState } from "react";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");

  const handleSaveButton = (event) => {
    event.preventDefault();
    console.log({ userName, email, password, team, role });
  };

  return (
    <div class="cotainer">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            {/* <div class="card-header">
              <h2>Register</h2>
            </div> */}

            <h5 class="card-title text-center">Register</h5>
            <div class="card-body">
              <form onSubmit={handleSaveButton}>
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right">
                    User Name
                  </label>
                  <div class="col-md-6">
                    <input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      type="text"
                      placeholder="user name"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right">
                    E-Mail Address
                  </label>
                  <div class="col-md-6">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="email"
                      class="form-control"
                      required
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right">
                    Password
                  </label>
                  <div class="col-md-6">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="text"
                      placeholder="password"
                      class="form-control"
                      required
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right">
                    Project
                  </label>
                  <div class="col-md-6">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Td Ameritrade"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right">
                    Team
                  </label>
                  <div class="col-md-6">
                    <input
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
                      type="text"
                      placeholder="team"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right">
                    Role
                  </label>
                  <div class="col-md-6">
                    <input
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      type="text"
                      placeholder="eg:- Java Developer"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6 offset-md-4">
                  <button type="submit" class="btn btn-primary btn-inline">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { useState } from "react";
import { Link } from "react-router-dom";
import AuthUser from "../../hooks/AuthUser";

export default function Login() {
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitForm = () => {
    // api call
    http
      .post("/login", { email: email, password: password })
      .then((res) => {
        setToken(res.data.user, res.data.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container d-flex align-items-center justify-content-center h-100">
      <div className="row justify-content-center w-100">
        <div className="col-sm-6">
          <div className="card p-4">
            <h1 className="text-center mb-3">Login </h1>
            <div className="form-group">
              <label>Email address:</label>
              <input
                type="email"
                className="form-control round-border"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password:</label>
              <input
                type="password"
                className="form-control round-border"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                id="pwd"
              />
            </div>
            <button
              type="button"
              onClick={submitForm}
              className="main-button mt-4"
            >
              Login
            </button>
            <div className="pt-3 d-flex">
              Don't have an account? &nbsp;
              <Link className="link-url" to="/register">
                Sign up.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

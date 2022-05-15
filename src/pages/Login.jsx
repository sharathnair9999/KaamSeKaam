import React, { useState } from "react";
import { useAuth } from "../contexts/user-context/user-context";
import "./styles/Auth.css";
import { constants, onChange } from "../helpers";
import { InputField } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { hiddenSignIn, signInUser } from "../services";

const Login = () => {
  const { setUserState } = useAuth();
  const navigate = useNavigate();
  const initialCredentialState = {
    email: "",
    password: "",
  };

  const [credentials, setCredentials] = useState(initialCredentialState);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <section className="container-header">
        <section className="flex-and-center gap-sm font-3xl">
          <h1>Log In</h1>
          <Link to={"/"} className="app-name">{` | Kaam Se Kaam`}</Link>
        </section>
      </section>
      <div className="container">
        <div className="login-container flex-and-center gap-1 w-100 flex-col">
          <img
            src={constants.imgUrls.auth}
            alt="auth"
            className="responsive-img auth-img border-rounded-sm"
          />
          <div className="flex-and-center gap-1 flex-col flex-grow-1 w-100">
            <form
              onSubmit={(e) =>
                signInUser(e, setIsLoading, setUserState, credentials)
              }
              className="fields"
            >
              <InputField
                legend={"Email"}
                type="email"
                name="email"
                value={credentials.email}
                required
                onChange={(e) => onChange(e, setCredentials)}
              />
              <InputField
                legend={"Password"}
                type="password"
                name="password"
                required
                value={credentials.password}
                onChange={(e) => onChange(e, setCredentials)}
              />
              <button className="btn btn-primary w-100" type="submit">
                {isLoading ? "Signing In..." : "Log In"}
              </button>
              <button
                className="btn btn-secondary w-100"
                onClick={() => hiddenSignIn(setUserState)}
                type="button"
              >
                Sign In Anonymously
              </button>
              <p className="flex items-center justify-space-btw w-100">
                <span>New User?</span>
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="link"
                >
                  Sign Up
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

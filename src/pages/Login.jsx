import React, { useState } from "react";

import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import { useAuth } from "../contexts/user-context/user-context";
import { toast } from "react-toastify";
import "./styles/Auth.css";
import { constants, onChange } from "../helpers";
import { InputField } from "../components";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { auth, setUserState } = useAuth();
  const navigate = useNavigate();
  const initialCredentialState = {
    email: "",
    password: "",
  };

  const [credentials, setCredentials] = useState(initialCredentialState);
  const [isLoading, setIsLoading] = useState(false);

  const signInUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const {
        user: { displayName, photoURL, email, uid },
      } = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      setUserState((state) => ({
        ...state,
        isLoggedIn: true,
        name: displayName,
        photoURL,
        email,
        uid,
      }));
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          name: displayName,
          photoURL,
          email,
          isLoggedIn: true,
          uid,
        })
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const hiddenSignIn = async () => {
    try {
      const {
        user: { uid },
      } = await signInAnonymously(auth);
      setUserState((state) => ({
        ...state,
        isLoggedIn: true,
        name: "Anonymous User",
        photoURL: constants.imgUrls.maleAvatar,
        uid,
      }));
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          name: "Anonymous User",
          photoURL: constants.imgUrls.maleAvatar,
          isLoggedIn: true,
          uid,
        })
      );
      toast.success("Signed In as Anonymous User");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <section className="container-header">
        <section className="flex-and-center gap-sm font-3xl">
          <h1>Log In</h1>
          <span className="app-name">{` | Kaam Se Kaam`}</span>
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
            <form onSubmit={signInUser} className="fields">
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
                onClick={() => hiddenSignIn()}
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

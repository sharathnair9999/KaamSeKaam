import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/user-context/user-context";
import { constants, onChange } from "../helpers";
import { InputField, SelectAvatar } from "../components";
import "./styles/Auth.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const initialCredentialState = {
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    photoURL: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState(initialCredentialState);

  const { auth } = useAuth();

  const signUpUser = (e) => {
    e.preventDefault();
    if (!credentials.photoURL) {
      toast.warn("Select an Avatar to proceed");
      return;
    }
    if (credentials.password !== credentials.confirmPassword) {
      toast.warn("Password doesn't match");
      return;
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then(
        ({
          user: {
            auth: { currentUser },
          },
        }) => {
          return currentUser;
        }
      )
      .then((user) =>
        updateProfile(user, {
          displayName: credentials.displayName,
          photoURL: credentials.photoURL,
        })
      )
      .then(() => {
        setIsLoading(false);
        toast.success(`Welcome ${credentials.displayName}`);
        setCredentials(initialCredentialState);
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message.split(" ").slice(1, -1).join(" "));
      });
  };

  return (
    <div>
      <section className="container-header">
        <section className="flex-and-center gap-sm font-3xl">
          <h1>Sign Up</h1>
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
          <form onSubmit={signUpUser} className="fields">
            <InputField
              legend={"Name"}
              type="text"
              name="displayName"
              value={credentials.displayName}
              autoFocus
              required
              onChange={(e) => onChange(e, setCredentials)}
            />
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
            <InputField
              legend={"Confirm Password"}
              type="password"
              name="confirmPassword"
              required
              value={credentials.confirmPassword}
              onChange={(e) => onChange(e, setCredentials)}
            />
            <section className="flex-and-center gap-2">
              <span> Select Avatar</span>
              <SelectAvatar
                credentials={credentials}
                setCredentials={setCredentials}
                id="male-avatar"
                thisAvatar={constants.imgUrls.maleAvatar}
              />
              <SelectAvatar
                credentials={credentials}
                setCredentials={setCredentials}
                id="female-avatar"
                thisAvatar={constants.imgUrls.femaleAvatar}
              />
            </section>
            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
            <p className="flex items-center justify-space-btw w-100">
              <span>Existing User?</span>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="link"
              >
                {`${isLoading ? `Signing In` : `Log In`}`}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

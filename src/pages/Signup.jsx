import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/user-context/user-context";
import { constants, onChange } from "../helpers";
import { InputField, SelectAvatar } from "../components";
import "./styles/Auth.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const initialCredentialState = {
    email: "",
    password: "",
    displayName: "",
    photoURL: "",
  };
  const [credentials, setCredentials] = useState(initialCredentialState);

  const { auth } = useAuth();

  const signUpUser = (e) => {
    e.preventDefault();
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
        toast.success("Welcome!");
        setCredentials(initialCredentialState);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user details ", user.auth);
      } else {
        console.log("signed out");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      <section className="container-header">
        <section className="flex-and-center gap-sm font-3xl">
          <h1>Sign Up</h1>
          <span className="app-name">{` | Kaam Se Kaam`}</span>
        </section>
      </section>
      <div className="container">
        <div className="login-container flex-and-center gap-1">
          <img
            src={constants.imgUrls.auth}
            alt="auth"
            className="responsive-img auth-img"
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
            <section className=" flex-and-center flex-col gap-sm">
              Select Avatar
              <section className="flex-and-center gap-2">
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
            </section>
            <button type="submit">Sign Up</button>
            <p>Existing User?</p>
            <button
              onClick={() => navigate("/login")}
              className="btn btn-primary"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

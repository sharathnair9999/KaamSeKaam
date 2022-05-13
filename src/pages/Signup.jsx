import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/user-context/user-context";
import { constants } from "../helpers";

const Signup = () => {
  const { maleAvatar, femaleAvatar } = constants;
  const [credentials, setCredentials] = useState({
    email: "test@test2.com",
    password: "testuser2",
    displayName: "",
    photoURL: "",
  });

  const { auth } = useAuth();

  const signUpUser = (email, password, displayName, photoURL) => {
    createUserWithEmailAndPassword(auth, email, password)
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
          displayName,
          photoURL,
        })
      )
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
    Signup
    </div>
  );
};

export default Signup;

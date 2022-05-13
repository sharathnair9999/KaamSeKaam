import React from "react";

import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import { useAuth } from "../contexts/user-context/user-context";
import { toast } from "react-toastify";

const Login = () => {
  const { auth, setUserState } = useAuth();

  const signInUser = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // setUserState((state) => ({ ...state, isLoggedIn: true }));
      console.log(result.user);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const hiddenSignIn = async () => {
    try {
      const result = await signInAnonymously(auth);
      // setUserState((state) => ({ ...state, isLoggedIn: true }));
      console.log(result);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
    Sign in
    </div>
  );
};

export default Login;

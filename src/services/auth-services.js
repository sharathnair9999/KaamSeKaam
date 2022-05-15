import {
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase-config";
import { constants } from "../helpers";

export const signInUser = async (e, setLoader, setUser, credentials) => {
  e.preventDefault();
  setLoader(true);
  try {
    const {
      user: { displayName, photoURL, email, uid },
    } = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    setUser((state) => ({
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
    setLoader(false);
  } catch (error) {
    setLoader(false);
    toast.error(error.message);
  }
};

export const hiddenSignIn = async (setUser) => {
  try {
    const {
      user: { uid },
    } = await signInAnonymously(auth);
    setUser((state) => ({
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

export const logoutUser = async (userSetter, taskDispatch) => {
  await signOut(auth);
  localStorage.removeItem("userDetails");
  userSetter({
    isLoggedIn: false,
    name: "",
    email: "",
    uid: "",
    photoURL: "",
  });
  taskDispatch({ type: "LOGOUT_USER" });
};

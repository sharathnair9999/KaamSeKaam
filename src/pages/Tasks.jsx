import React from "react";
import { signOut } from "firebase/auth";
import { useAuth } from "../contexts/user-context/user-context";
import { BiLogOut } from "react-icons/bi";
import "./styles/Tasks.css";

const Tasks = () => {
  const {
    auth,
    setUserState,
    userState: { name, photoURL },
  } = useAuth();
  const logoutUser = async () => {
    await signOut(auth);
    localStorage.removeItem("userDetails");
    setUserState({
      isLoggedIn: false,
      name: "",
      email: "",
      uid: "",
      photoURL: "",
    });
  };
  return (
    <div>
      <section className="container-header login-container gap-sm">
        <img src={photoURL} alt="avatar" className="avatar responsive-img" />
        <section>
          <h1 className=" font-3xl">{`Hi ${
            name[0].toUpperCase() + name.slice(1)
          }`}</h1>
          <p>{`3 pending Tasks, 2 completed tasks`}</p>
        </section>
        <button
          className="signup-btn flex-and-center gap-sm"
          onClick={logoutUser}
        >
          <BiLogOut size="1.2rem" />
          <span>Sign Out</span>
        </button>
      </section>
      <div className="container"></div>
    </div>
  );
};

export default Tasks;

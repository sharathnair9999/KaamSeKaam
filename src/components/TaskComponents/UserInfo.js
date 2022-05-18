import React from "react";
import { useAuth, useTask } from "../../contexts";
import { logoutUser } from "../../services";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();
  const {
    setUserState,
    userState: { name, photoURL },
  } = useAuth();

  const {
    taskState: { pendingTasks, completedTasks },
    taskDispatch,
  } = useTask();
  return (
    <section className="container-header login-container gap-sm">
      <img
        src={photoURL}
        alt="avatar"
        className="avatar responsive-img"
        onClick={() => navigate("/tasks")}
      />
      <section className="user-summary">
        <h1>{`Hi ${name[0].toUpperCase() + name.slice(1)}`}</h1>
        <p>{`${pendingTasks.length} pending Tasks, ${completedTasks.length} completed tasks`}</p>
      </section>
      <button
        className="signup-btn flex-and-center gap-sm"
        onClick={() => logoutUser(setUserState, taskDispatch)}
      >
        <BiLogOut size="1.2rem" />
        <span>Sign Out</span>
      </button>
    </section>
  );
};

export default UserInfo;

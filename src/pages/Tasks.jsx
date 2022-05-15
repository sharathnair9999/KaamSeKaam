import React, { useEffect } from "react";
import { useAuth } from "../contexts/user-context/user-context";
import { BiLogOut } from "react-icons/bi";
import "./styles/Tasks.css";
import { TaskContainer } from "../components";
import { useTask } from "../contexts";
import TaskModal from "../components/TaskComponents/TaskModal";
import { useClickOutside } from "../custom-hooks";
import { IoIosAddCircleOutline } from "react-icons/io";
import { getUserTasks, logoutUser } from "../services";

const Tasks = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useClickOutside(false);

  const {
    setUserState,
    userState: { name, photoURL, uid },
  } = useAuth();

  const {
    taskState: { pendingTasks, completedTasks },
  } = useTask();

  useEffect(() => {
    getUserTasks(uid);
  }, []);

  return (
    <div>
      <section className="container-header login-container gap-sm">
        <img src={photoURL} alt="avatar" className="avatar responsive-img" />
        <section className="user-summary">
          <h1>{`Hi ${name[0].toUpperCase() + name.slice(1)}`}</h1>
          <p>{`3 pending Tasks, 2 completed tasks`}</p>
        </section>
        <button
          className="signup-btn flex-and-center gap-sm"
          onClick={() => logoutUser(setUserState)}
        >
          <BiLogOut size="1.2rem" />
          <span>Sign Out</span>
        </button>
      </section>
      <div ref={ref} className="container all-tasks">
        <button
          onClick={() => setIsComponentVisible(!isComponentVisible)}
          className="add-task btn flex-and-center gap-sm"
        >
          <span>Add New Task</span>
          <IoIosAddCircleOutline size={"2rem"} />
        </button>
        <div className="flex-and-center gap-2">
          <TaskContainer tasks={pendingTasks} />
          <TaskContainer tasks={completedTasks} isCompleted />
        </div>
        <TaskModal
          isComponentVisible={isComponentVisible}
          setIsComponentVisible={setIsComponentVisible}
        />
      </div>
    </div>
  );
};

export default Tasks;

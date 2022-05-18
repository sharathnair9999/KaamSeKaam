import React, { useEffect } from "react";
import { useAuth } from "../contexts/user-context/user-context";
import "./styles/Tasks.css";
import { TaskContainer, UserInfo } from "../components";
import { useTask } from "../contexts";
import TaskModal from "../components/TaskComponents/TaskModal";
import { useClickOutside } from "../custom-hooks";
import { IoIosAddCircleOutline } from "react-icons/io";
import { getUserTasks } from "../services";

const Tasks = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useClickOutside(false);

  const {
    userState: { uid },
  } = useAuth();

  const {
    taskState: { pendingTasks, completedTasks },
    taskDispatch,
  } = useTask();

  useEffect(() => {
    getUserTasks(uid, taskDispatch);
  }, []);

  return (
    <div>
      <UserInfo />
      <div ref={ref} className="container all-tasks">
        <button
          onClick={() => setIsComponentVisible(!isComponentVisible)}
          className="add-task btn flex-and-center gap-sm"
        >
          <span>Add New Task</span>
          <IoIosAddCircleOutline size={"2rem"} />
        </button>
        <div className="all-tasks-container">
          <TaskContainer tasks={pendingTasks} isPending />
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

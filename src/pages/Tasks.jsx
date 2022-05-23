import React, { useEffect } from "react";
import { useAuth } from "../contexts/user-context/user-context";
import "./styles/Tasks.css";
import { TaskContainer, UserInfo } from "../components";
import { useTask } from "../contexts";
import TaskModal from "../components/TaskComponents/TaskModal";
import { useClickOutside } from "../custom-hooks";
import { IoIosAddCircleOutline } from "react-icons/io";
import { getUserTasks } from "../services";
import { Droppable } from "react-beautiful-dnd";

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
          <span>New Task</span>
          <IoIosAddCircleOutline />
        </button>
        <div className="all-tasks-container">
          <Droppable droppableId="pendingTasks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <TaskContainer tasks={pendingTasks} isPending />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="completedTasks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <TaskContainer tasks={completedTasks} isCompleted />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
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

import React from "react";
import { useTask } from "../../contexts";
import "./TaskContainer.css";
import TaskItem from "./TaskItem";

const TaskContainer = ({ tasks, isCompleted }) => {
  const pinnedTasks = tasks.filter((task) => task.isPinned);
  const unpinnedTasks = tasks.filter((task) => !task.isPinned);

  const {
    taskState: { isLoading },
  } = useTask();

  return (
    <div className="tasks-container">
      <h2>{`${isCompleted ? "Completed" : "Pending"} Tasks - ${
        tasks.length
      }`}</h2>

      {isLoading ? (
        "Loading" //pending to finish
      ) : (
        <div className="task-items">
          {pinnedTasks.map((task, id) => (
            <TaskItem
              key={task.taskId}
              sNo={id + 1}
              isCompleted={isCompleted}
              task={task}
            />
          ))}
          {unpinnedTasks.map((task, id) => (
            <TaskItem
              key={task.taskId}
              sNo={id + 1}
              isCompleted={isCompleted}
              task={task}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskContainer;

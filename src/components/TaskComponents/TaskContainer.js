import React from "react";
import "./TaskContainer.css";
import TaskItem from "./TaskItem";

const TaskContainer = ({ tasks, isCompleted, isPending }) => {
  const pinnedTasks = tasks.filter((task) => task.isPinned);
  const unpinnedTasks = tasks.filter((task) => !task.isPinned);

  return (
    <div className="tasks-container">
      <h2>{`${isCompleted ? "Completed" : "Pending"} Tasks - ${
        tasks.length
      }`}</h2>

      <div className="task-items">
        {pinnedTasks.map((task, id) => (
          <TaskItem
            key={task.taskId}
            sNo={id + 1}
            isCompleted={isCompleted}
            isPending={isPending}
            task={task}
          />
        ))}
        {unpinnedTasks.map((task, id) => (
          <TaskItem
            key={task.taskId}
            sNo={id + pinnedTasks.length + 1}
            isCompleted={isCompleted}
            isPending={isPending}
            task={task}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskContainer;

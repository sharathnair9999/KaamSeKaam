import { createContext, useContext, useReducer } from "react";
import { useAuth } from "../user-context/user-context";
import { initialTaskState, taskReducer } from "./task-utils";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [taskState, taskDispatch] = useReducer(taskReducer, initialTaskState);
  const { auth } = useAuth();

  const value = { taskState, taskDispatch, auth };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => useContext(TaskContext);

export { TaskProvider };

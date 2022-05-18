import { taskActions } from "./task-actions";

export const initialTaskState = {
  pendingTasks: [],
  completedTasks: [],
  currentTask: {
    taskId: "",
    taskName: "",
    taskDescription: "",
    taskDuration: "",
    longBreak: "",
    shortBreak: "",
    isCompleted: false,
    isPinned: false,
    createdTime: null,
  },
  isLoading: false,
};

export const taskReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case taskActions.GET_PENDING_TASKS:
      return { ...state, pendingTasks: payload };
    case taskActions.GET_COMPLETED_TASKS:
      return { ...state, completedTasks: payload };
    case taskActions.DELETE_PENDING_TASK:
      let newPendingTasks = state.pendingTasks.filter(
        (task) => task.taskId !== payload
      );
      return { ...state, pendingTasks: newPendingTasks };
    case taskActions.DELETE_COMPLETED_TASK:
      let newCompletedTasks = state.completedTasks.filter(
        (task) => task.taskId !== payload
      );
      return { ...state, completedTasks: newCompletedTasks };
    case taskActions.UPDATE_PENDING_TASK:
      return {
        ...state,
        pendingTasks: state.pendingTasks.map((task) =>
          task.taskId === payload.taskId ? payload : task
        ),
      };
    case taskActions.SINGLE_TASK:
      return {
        ...state,
        currentTask: payload,
      };
    case taskActions.SINGLE_TASK_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case taskActions.LOGOUT_USER:
      return initialTaskState;
    default:
      return state;
  }
};

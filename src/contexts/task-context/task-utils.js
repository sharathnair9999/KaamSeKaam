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
    case "GET_PENDING_TASKS":
      return { ...state, pendingTasks: payload };
    case "GET_COMPLETED_TASKS":
      return { ...state, completedTasks: payload };
    case "DELETE_PENDING_TASK":
      let newPendingTasks = state.pendingTasks.filter(
        (task) => task.taskId !== payload
      );
      return { ...state, pendingTasks: newPendingTasks };
    case "DELETE_COMPLETED_TASK":
      let newCompletedTasks = state.completedTasks.filter(
        (task) => task.taskId !== payload
      );
      return { ...state, completedTasks: newCompletedTasks };
    case "UPDATE_PENDING_TASK":
      return {
        ...state,
        pendingTasks: state.pendingTasks.map((task) =>
          task.taskId === payload.taskId ? payload : task
        ),
      };
    case "MOVE_TO_COMPLETED_TASKS":
      let taskToMoveToCompleted = payload;
      let newCompletedTasks2 = state.completedTasks.unshift(
        taskToMoveToCompleted
      );
      let newPendingTasks2 = state.pendingTasks.filter(
        (task) => taskToMoveToCompleted.taskId !== task.taskId
      );
      return {
        ...state,
        completedTasks: newCompletedTasks2,
        pendingTasks: newPendingTasks2,
      };

    case "MOVE_TO_PENDING_TASKS":
      let taskToMoveToPending = payload;
      let newPendingTasks3 = state.completedTasks.unshift(taskToMoveToPending);
      let newCompletedTasks3 = state.pendingTasks.filter(
        (task) => taskToMoveToPending.taskId !== task.taskId
      );
      return {
        ...state,
        completedTasks: newCompletedTasks3,
        pendingTasks: newPendingTasks3,
      };
    case "SINGLE_TASK":
      return {
        ...state,
        currentTask: payload,
      };
    case "SINGLE_TASK_LOADING":
      return {
        ...state,
        isLoading: payload,
      };
    case "LOGOUT_USER":
      return initialTaskState;
    default:
      return state;
  }
};

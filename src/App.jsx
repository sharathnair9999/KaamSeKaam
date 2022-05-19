import { ToastContainer } from "react-toastify";
import AllRoutes from "./helpers/AllRoutes";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { DragDropContext } from "react-beautiful-dnd";
import { useAuth, useTask } from "./contexts";
import { taskActions } from "./contexts/task-context/task-actions";
import { completeTaskHandler } from "./services";

const App = () => {
  const {
    taskDispatch,
    taskState: { pendingTasks, completedTasks },
  } = useTask();
  const {
    userState: { uid },
  } = useAuth();
  const dragHandler = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    let taskIndexToMove,
      taskToMove,
      pTasks = pendingTasks,
      cTasks = completedTasks;

    if (source.droppableId === "pendingTasks") {
      taskToMove = pendingTasks.find((task) => task.taskId === draggableId);
      taskIndexToMove = pTasks[source.index];
      pTasks.splice(source.index, 1);
    } else {
      taskToMove = completedTasks.find((task) => task.taskId === draggableId);
      taskIndexToMove = cTasks[source.index];
      cTasks.splice(source.index, 1);
    }
    if (destination.droppableId === "pendingTasks") {
      pTasks.splice(destination.index, 0, taskIndexToMove);
    } else {
      cTasks.splice(destination.index, 0, taskIndexToMove);
    }

    taskDispatch({ type: taskActions.GET_COMPLETED_TASKS, payload: cTasks });
    taskDispatch({ type: taskActions.GET_PENDING_TASKS, payload: pTasks });

    completeTaskHandler(
      uid,
      taskToMove,
      destination.droppableId === "pendingTasks" ? false : true
    );
  };
  return (
    <DragDropContext onDragEnd={dragHandler}>
      <div className="App">
        <ToastContainer autoClose={3000} position="top-center" />
        <AllRoutes />
      </div>
    </DragDropContext>
  );
};

export default App;

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { taskActions } from "../contexts/task-context/task-actions";
import { db } from "../firebase/firebase-config";

export const getUserTasks = (userId, dispatch) => {
  try {
    const querySnapshot = query(collection(db, `userData/${userId}/tasks`));

    const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
      const tasks = [];
      snapshot.forEach((doc) => {
        tasks.push({
          taskId: doc.id,
          ...doc.data(),
        });
        const completedTasks = tasks.filter((task) => task.isCompleted);
        const pendingTasks = tasks.filter((task) => !task.isCompleted);
        dispatch({
          type: taskActions.GET_PENDING_TASKS,
          payload: pendingTasks,
        });
        dispatch({
          type: taskActions.GET_COMPLETED_TASKS,
          payload: completedTasks,
        });
      });
    });
    return unsubscribe;
  } catch (error) {
    toast.error("Could not retrieve your Tasks. Please try later!");
  }
};

export const addTask = async (userId, currTaskState) => {
  try {
    await addDoc(collection(db, `userData/${userId}/tasks`), {
      taskName: currTaskState.taskName,
      taskDescription: currTaskState.taskDescription,
      taskDuration: Number(currTaskState.taskDuration),
      shortBreak: Number(currTaskState.shortBreak),
      longBreak: Number(currTaskState.longBreak),
      isCompleted: Boolean(false),
      isPinned: Boolean(currTaskState.isPinned),
      createdTime: serverTimestamp(),
    });
    toast.success(`New Task Added Successfully`);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deleteTask = async (
  userId,
  taskId,
  dispatch,
  isCompleted,
  isPending
) => {
  try {
    const collectionRef = collection(db, `userData/${userId}/tasks`);
    const docRef = doc(collectionRef, taskId);
    await deleteDoc(docRef);
    isPending &&
      dispatch({ type: taskActions.DELETE_PENDING_TASK, payload: taskId });
    isCompleted &&
      dispatch({ type: taskActions.DELETE_COMPLETED_TASK, payload: taskId });
    toast.success(`Deleted Task Successfully`);
  } catch (error) {
    toast.error(error);
  }
};

export const updateTask = async (userId, task) => {
  try {
    const collectionRef = collection(db, `userData/${userId}/tasks`);
    const docRef = doc(collectionRef, task.taskId);
    setDoc(docRef, {
      ...task,
      taskDuration: Number(task.taskDuration),
      longBreak: Number(task.longBreak),
      shortBreak: Number(task.shortBreak),
      updatedOn: serverTimestamp(),
    });
    toast.success("Updated Task Successfully");
  } catch (error) {
    toast.error(error);
  }
};

export const pinTaskHandler = async (userId, task) => {
  try {
    const collectionRef = collection(db, `userData/${userId}/tasks`);
    const docRef = doc(collectionRef, task.taskId);
    setDoc(docRef, {
      ...task,
      isPinned: Boolean(!task.isPinned),
    });
    toast.success(
      `${
        task.isPinned
          ? "Removed Pin from the Task"
          : "Pinned the task to stay on top"
      }`
    );
  } catch (error) {
    toast.error(error);
  }
};

export const getSingleTask = async (userId, taskId, taskDispatch) => {
  try {
    taskDispatch({ type: taskActions.SINGLE_TASK_LOADING, payload: true });
    const unsubscribe = onSnapshot(
      doc(db, `userData/${userId}/tasks/${taskId}`),
      (doc) => {
        const data = doc.data();
        taskDispatch({
          type: taskActions.SINGLE_TASK,
          payload: { ...data },
        });
      }
    );
    taskDispatch({ type: taskActions.SINGLE_TASK_LOADING, payload: false });
    return unsubscribe;
  } catch (error) {
    taskDispatch({ type: taskActions.SINGLE_TASK_LOADING, payload: false });
    toast.error(error);
  }
};

export const completeTaskHandler = async (
  userId,
  task,
  taskId,
  isCompleted
) => {
  try {
    const collectionRef = collection(db, `userData/${userId}/tasks`);
    const docRef = doc(collectionRef, taskId);
    await updateDoc(docRef, {
      ...task,
      isCompleted: isCompleted,
      completedOn: isCompleted ? serverTimestamp() : null,
    });
    toast.success(
      `${
        isCompleted ? "Completed Task Successfully" : "Task not completed yet"
      }`
    );
  } catch (error) {
    toast.error("Could not complete the action");
  }
};

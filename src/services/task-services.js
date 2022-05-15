import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase-config";

export const getUserTasks = (userId, dispatch) => {
  try {
    console.log("getting");
    dispatch({ type: "LOADING_TASKS", payload: true });
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
        dispatch({ type: "GET_PENDING_TASKS", payload: pendingTasks });
        dispatch({ type: "GET_COMPLETED_TASKS", payload: completedTasks });
      });
    });
    dispatch({ type: "LOADING_TASKS", payload: false });
    return unsubscribe;
  } catch (error) {
    dispatch({ type: "LOADING_TASKS", payload: false });
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
    });
    toast.success(`New Task Added Successfully`);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deleteTask = async (userId, taskId, dispatch) => {
  try {
    const collectionRef = collection(db, `userData/${userId}/tasks`);
    const docRef = doc(collectionRef, taskId);
    await deleteDoc(docRef);
    dispatch({ type: "DELETE_PENDING_TASK", payload: taskId });
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
      taskName: task.taskName,
      taskDescription: task.taskDescription,
      taskDuration: task.taskDuration,
      longBreak: task.longBreak,
      shortBreak: task.shortBreak,
      isCompleted: false,
      isPinned: task.isPinned,
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
      taskName: task.taskName,
      taskDescription: task.taskDescription,
      taskDuration: task.taskDuration,
      longBreak: task.longBreak,
      shortBreak: task.shortBreak,
      isCompleted: false,
      isPinned: !task.isPinned,
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

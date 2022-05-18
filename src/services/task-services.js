import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
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
        dispatch({ type: "GET_PENDING_TASKS", payload: pendingTasks });
        dispatch({ type: "GET_COMPLETED_TASKS", payload: completedTasks });
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
    isPending && dispatch({ type: "DELETE_PENDING_TASK", payload: taskId });
    isCompleted && dispatch({ type: "DELETE_COMPLETED_TASK", payload: taskId });
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
    taskDispatch({ type: "SINGLE_TASK_LOADING", payload: true });
    const collectionRef = collection(db, `userData/${userId}/tasks`);
    const docRef = doc(collectionRef, taskId);
    const docSnap = await getDoc(docRef);
    taskDispatch({ type: "SINGLE_TASK_LOADING", payload: false });
    if (docSnap.exists()) {
      const currentTask = docSnap.data();
      const currentId = docSnap.id;
      taskDispatch({
        type: "SINGLE_TASK",
        payload: { ...currentTask, taskId: currentId },
      });
    } else {
      toast.error("Doesn't seem there is not them, but you can ever felt that");
    }
  } catch (error) {
    taskDispatch({ type: "SINGLE_TASK_LOADING", payload: false });
    toast.error(error);
  }
};

export const completeTaskHandler = async (userId, task, isCompleted) => {
  try {
    const collectionRef = collection(db, `userData/${userId}/tasks`);
    const docRef = doc(collectionRef, task.taskId);
    setDoc(docRef, {
      ...task,
      isCompleted: Boolean(isCompleted),
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

import React, { useState } from "react";
import { InputField } from "../../components";
import { useTask } from "../../contexts";
import { useAuth } from "../../contexts/user-context/user-context";
import { onChange } from "../../helpers";
import { addTask, updateTask } from "../../services";
const TaskModal = ({
  isComponentVisible,
  setIsComponentVisible,
  task,
  existingTask,
}) => {
  const {
    taskState: { currentTask },
  } = useTask();
  const {
    userState: { uid },
  } = useAuth();

  const initialTaskState = existingTask ? task : currentTask;
  const [currTaskState, setCurrTaskState] = useState(initialTaskState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingTask) {
      updateTask(uid, currTaskState);
    } else {
      addTask(uid, currTaskState);
    }
    setIsComponentVisible(!isComponentVisible);
    setCurrTaskState(initialTaskState);
  };

  return (
    <div
      className={`${
        isComponentVisible ? "show-modal-wrapper" : "hide-modal-wrapper"
      } modal-wrapper`}
    >
      <form onSubmit={handleSubmit} className="modal-container">
        <InputField
          legend={"Title"}
          type={"text"}
          name={"taskName"}
          required
          value={currTaskState.taskName}
          onChange={(e) => onChange(e, setCurrTaskState)}
        />
        <InputField
          legend={"Description"}
          type={"text"}
          value={currTaskState.taskDescription}
          name={"taskDescription"}
          required
          onChange={(e) => onChange(e, setCurrTaskState)}
        />
        <InputField
          legend={"Task Duration"}
          type={"number"}
          value={currTaskState.taskDuration}
          name={"taskDuration"}
          required
          min={25}
          max={90}
          onChange={(e) => onChange(e, setCurrTaskState)}
        />
        <InputField
          legend={"Short Break"}
          type={"number"}
          value={currTaskState.shortBreak}
          name={"shortBreak"}
          required
          min={5}
          max={20}
          onChange={(e) => onChange(e, setCurrTaskState)}
        />
        <InputField
          legend={"Long Break"}
          type={"number"}
          min={5}
          max={30}
          value={currTaskState.longBreak}
          name={"longBreak"}
          required
          onChange={(e) => onChange(e, setCurrTaskState)}
        />
        <section className="flex justify-fe items-center gap-1 pt-1">
          <button className="btn btn-primary" type="submit">
            {existingTask ? "Update" : "Add"}
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => {
              setIsComponentVisible(!isComponentVisible);
              setCurrTaskState(initialTaskState);
            }}
          >
            Cancel
          </button>
        </section>
      </form>
    </div>
  );
};

export default TaskModal;

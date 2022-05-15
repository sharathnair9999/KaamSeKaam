import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BsPinAngleFill,
  BsPinAngle,
  BsFillPencilFill,
  BsFillTrashFill,
} from "react-icons/bs";
import TaskModal from "./TaskModal";
import { useClickOutside } from "../../custom-hooks";
import { deleteTask, pinTaskHandler } from "../../services";
import { useAuth } from "../../contexts/user-context/user-context";
import { useTask } from "../../contexts";

const TaskItem = ({ task, sNo, isCompleted }) => {
  const navigate = useNavigate();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useClickOutside(false);
  const {
    userState: { uid },
  } = useAuth();

  const { taskDispatch } = useTask();

  return (
    <div ref={ref} className="task-item">
      <span className="serial-no">{sNo}</span>
      <section onClick={() => navigate(`/tasks/123`)} className="task-text">
        <p className="task-title">{task.taskName}</p>
        <p className="task-description">{task.taskDescription}</p>
      </section>
      <section className="task-actions">
        <button onClick={() => pinTaskHandler(uid, task)}>
          {task.isPinned ? (
            <BsPinAngleFill size={"1.1rem"} />
          ) : (
            <BsPinAngle size={"1.1rem"} />
          )}
        </button>
        {!isCompleted && (
          <button
            onClick={() => {
              setIsComponentVisible(!isComponentVisible);
            }}
          >
            {<BsFillPencilFill size={"1.1rem"} />}
          </button>
        )}
        <button>
          {
            <BsFillTrashFill
              size={"1.1rem"}
              onClick={() => deleteTask(uid, task.taskId, taskDispatch)}
            />
          }
        </button>
      </section>
      <TaskModal
        isComponentVisible={isComponentVisible}
        setIsComponentVisible={setIsComponentVisible}
        task={task}
        existingTask
      />
    </div>
  );
};

export default TaskItem;

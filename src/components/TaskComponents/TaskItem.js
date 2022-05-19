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
import { Draggable } from "react-beautiful-dnd";

const TaskItem = ({ index, task, sNo, isCompleted, isPending }) => {
  const navigate = useNavigate();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useClickOutside(false);
  const {
    userState: { uid },
  } = useAuth();

  const { taskDispatch } = useTask();
  const formattedCreatedTime = new Date(
    task.createdTime?.seconds * 1000
  ).toLocaleString();
  const formattedCompletedTime = new Date(
    task.completedOn?.seconds * 1000
  ).toLocaleString();

  return (
    <Draggable draggableId={task.taskId} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="task-item"
        >
          <span className="serial-no">{sNo}</span>
          <section
            onClick={() => navigate(`/tasks/${task.taskId}`)}
            className="task-text"
          >
            <p className="task-title">{task.taskName}</p>
            <span>{`Duration : ${task.taskDuration} min.`}</span>

            {!task.isCompleted && (
              <p className="task-description">{`Created On :  ${formattedCreatedTime}`}</p>
            )}
            {task.isCompleted && (
              <p className="task-description">{`Completed On : ${formattedCompletedTime}`}</p>
            )}
          </section>
          <section className="task-actions">
            {!isCompleted && (
              <button onClick={() => pinTaskHandler(uid, task)}>
                {task.isPinned ? <BsPinAngleFill /> : <BsPinAngle />}
              </button>
            )}
            {!isCompleted && (
              <button
                onClick={() => {
                  setIsComponentVisible(!isComponentVisible);
                }}
              >
                {<BsFillPencilFill />}
              </button>
            )}
            <button>
              {
                <BsFillTrashFill
                  onClick={() =>
                    deleteTask(
                      uid,
                      task.taskId,
                      taskDispatch,
                      isCompleted,
                      isPending
                    )
                  }
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
      )}
    </Draggable>
  );
};

export default TaskItem;

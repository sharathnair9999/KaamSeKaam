import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Confetti, SideHeadingText, Timer, UserInfo } from "../components";
import { useAuth, useTask } from "../contexts";
import { completeTaskHandler, getSingleTask, deleteTask } from "../services";

const SingleTask = () => {
  const {
    taskDispatch,
    taskState: { currentTask, isLoading },
  } = useTask();

  const navigate = useNavigate();

  const { taskId } = useParams();
  const [taskCompleted, setTaskCompleted] = useState(currentTask.taskCompleted);
  const [showConfetti, setShowConfetti] = useState(currentTask.taskCompleted);

  const {
    userState: { uid },
  } = useAuth();

  const formattedCreatedTime = new Date(
    currentTask.createdTime?.seconds * 1000
  ).toLocaleString();
  const formattedCompletedTime = new Date(
    currentTask.completedOn?.seconds * 1000
  ).toLocaleString();

  useEffect(() => {
    getSingleTask(uid, taskId, taskDispatch);
    taskCompleted && completeTaskHandler(uid, currentTask, true);
  }, [taskCompleted, currentTask?.updatedOn?.seconds]);

  useEffect(() => {
    taskCompleted && setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 2000);
  }, [taskCompleted]);

  const deleteTaskHandler = () => {
    deleteTask(uid, taskId, taskDispatch, currentTask.isCompleted);
    navigate(-1, { replace: true });
  };

  return (
    <div>
      <UserInfo />
      <div className="container">
        {isLoading ? (
          <div className="flex-and-center h-100">
            <img src="/images/loader.svg" alt="loader" />
          </div>
        ) : (
          <div className="single-task-container p-sm">
            {!currentTask.isCompleted && (
              <Timer
                totalDuration={Number(currentTask.taskDuration)}
                longBreak={currentTask.longBreak}
                shortBreak={currentTask.shortBreak}
                setTaskCompleted={setTaskCompleted}
                isCompleted={currentTask.isCompleted}
              />
            )}
            <div className="task-details-container">
              <div className="flex justify-fs items-fs flex-col gap-1">
                <section className="flex-and-center gap-1">
                  {currentTask.isCompleted && (
                    <button
                      onClick={() =>
                        completeTaskHandler(uid, currentTask, false)
                      }
                      className="btn-secondary btn"
                    >
                      Move To Pending Tasks
                    </button>
                  )}
                  <button
                    onClick={deleteTaskHandler}
                    className="btn-danger btn"
                  >
                    Delete Task
                  </button>
                </section>
                <SideHeadingText
                  largeText
                  text={currentTask.taskName}
                  heading={"Title : "}
                />
                <SideHeadingText
                  largeText
                  text={currentTask.taskDescription}
                  heading={"Description : "}
                />
                <SideHeadingText
                  smallText
                  text={formattedCreatedTime}
                  heading={"Task Created On : "}
                />
                <SideHeadingText
                  condition={currentTask.isCompleted}
                  heading="Completion Status : "
                  satisfiedText="Done!!!!"
                  notSatisfiedText={"Not Started Yet!?"}
                  largeText
                />

                {currentTask.isCompleted && (
                  <SideHeadingText
                    smallText
                    text={formattedCompletedTime}
                    heading={"Completed On : "}
                  />
                )}
              </div>
              <div className="instructions mt-2">
                <h3>Instructions :</h3>
                <ul>
                  <li>
                    You can start/play/pause the task by hitting the play button
                  </li>
                  <li>
                    <section className="inline-flex justify-fs items-fs gap-sm flex-col">
                      <p>
                        Allowed Short Breaks :
                        <b>
                          <i>2</i>
                        </b>
                      </p>
                      <p>
                        Short Break Criteria :
                        <i>
                          <b>25% Task Completion</b>
                        </i>
                      </p>
                    </section>
                  </li>
                  <li>
                    <section className="inline-flex justify-fs items-fs gap-sm flex-col">
                      <p>
                        Allowed Long Breaks :
                        <b>
                          <i>1</i>
                        </b>
                      </p>
                      <p>
                        Long Break Criteria :
                        <i>
                          <b>50% Task Completion</b>
                        </i>
                      </p>
                    </section>
                  </li>
                  <li>Reset the timer to start over.</li>
                  <li>
                    Do not leave from this page before completing the task.
                  </li>
                  <li>
                    Remember this is to make you a{" "}
                    <b className="letter-space-xsm">
                      Pro<span className="line-through">crastinator</span>
                    </b>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <Confetti showConfetti={showConfetti} />
    </div>
  );
};

export default SingleTask;

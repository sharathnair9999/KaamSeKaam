import React, { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "react-toastify";
import "./Timer.css";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { BiReset } from "react-icons/bi";

const Timer = ({ totalDuration, longBreak, shortBreak, setTaskCompleted }) => {
  const [minutes, setMinutes] = useState(totalDuration);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(totalDuration * 60);
  const [isPaused, setIsPaused] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);
  const [inShortBreak, setInShortBreak] = useState(false);
  const [shortBreakSeconds, setShortBreakSeconds] = useState(shortBreak * 60);
  const [inLongBreak, setInLongBreak] = useState(false);
  const [longBreakSeconds, setLongBreakSeconds] = useState(longBreak * 60);

  const startTimer = () => {
      setIsPaused((state) => !state);
    },
    getRemaingTime = () =>
      `${minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`,
    resetTimer = () => {
      inShortBreak && setMinutes(longBreak);
      inLongBreak && setMinutes(shortBreak);
      setMinutes(totalDuration);
      setTotalSeconds(totalDuration * 60);

      setSeconds(0);
      setIsPaused(true);
    },
    handleShortBreak = () => {
      // if (totalSeconds <= Math.floor(totalDuration * 60 * 0.75)) {
      setIsPaused(true);
      setInShortBreak(true);
      setInLongBreak(false);
      setRemainingTime(totalSeconds / 60);
      setMinutes(shortBreak);
      setSeconds(0);
      // } else {
      //   toast.warn(
      //     "You need to complete 25% of the task to take a short break"
      //   );
      // }
    },
    handleLongBreak = () => {
      if (totalSeconds <= (totalDuration * 60) / 2) {
        setIsPaused(false);
        setInShortBreak(false);
        setInLongBreak(true);
        setRemainingTime(totalSeconds / 60);
        setMinutes(longBreak);
        setSeconds(0);
      } else {
        toast.warn(
          "You need to complete half of the task to take a long break"
        );
        return;
      }
    },
    continueTask = () => {
      setInLongBreak(false);
      setInShortBreak(false);
      setMinutes(Math.floor(remainingTime));
      setSeconds(Math.floor(remainingTime * 60));
    };

  useEffect(() => {
    document.title = `${getRemaingTime()} | Kaam Se Kaam`;
    if (!isPaused) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
            setTaskCompleted(true);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
        setTotalSeconds((state) => state - 1);
      }, 1000);

      return () => {
        document.title = "Kaam Se Kaam";
        clearInterval(myInterval);
      };
    }
    if (inShortBreak) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
        setShortBreakSeconds((state) => state - 1);
      }, 1000);

      return () => {
        document.title = "Kaam Se Kaam";
        clearInterval(myInterval);
      };
    }
    if (inLongBreak) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
        setLongBreakSeconds((state) => state - 1);
      }, 1000);

      return () => {
        document.title = "Kaam Se Kaam";
        clearInterval(myInterval);
      };
    }
  });

  return (
    <div className="task-timer-container">
      <section className="single-task-actions">
        {(inLongBreak || inShortBreak) && (
          <button className="btn btn-small btn-primary" onClick={continueTask}>
            Continue Task
          </button>
        )}
        {!inShortBreak && (
          <button
            className="btn btn-small btn-secondary"
            onClick={handleShortBreak}
          >
            Short Break
          </button>
        )}
        {!inLongBreak && (
          <button
            className="btn btn-small btn-secondary"
            onClick={handleLongBreak}
          >
            Long Break
          </button>
        )}
      </section>
      <div className="task-timer">
        <CircularProgressbar
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0.25,

            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "butt",

            // Text size
            textSize: "16px",

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,

            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',

            // Colors
            pathColor: `rgba(62, 152, 199, ${totalSeconds / 100})`,
            textColor: "var(--gradient-color-2)",
            trailColor: "#d6d6d6",
          })}
          maxValue={
            inShortBreak
              ? shortBreak * 60
              : inLongBreak
              ? longBreak * 60
              : totalDuration * 60
          }
          minValue={0}
          value={
            inShortBreak
              ? shortBreak * 60 - shortBreakSeconds
              : inLongBreak
              ? longBreak * 60 - longBreakSeconds
              : totalDuration * 60 - totalSeconds
          }
          text={getRemaingTime()}
          strokeWidth={7}
        />
      </div>
      <section className="flex-and-center w-100 gap-1 mt-1">
        <button className="btn btn-primary" onClick={startTimer}>
          {isPaused ? (
            <AiFillPlayCircle size={"2rem"} />
          ) : (
            <AiFillPauseCircle size={"2rem"} />
          )}
        </button>
        <button className="btn  btn-danger" onClick={resetTimer}>
          <BiReset size={"2rem"} />
        </button>
      </section>
    </div>
  );
};

export default Timer;

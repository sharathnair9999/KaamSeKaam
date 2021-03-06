import React, { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "react-toastify";
import "./Timer.css";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { useAudio } from "../../custom-hooks";

const Timer = ({
  totalDuration,
  longBreak,
  shortBreak,
  setTaskCompleted,
  isCompleted,
}) => {
  const [, toggle] = useAudio("/single-click.wav");
  const [, toggleError] = useAudio("/error-click.wav");
  const [, toggleClap] = useAudio("/clap.wav");
  const [minutes, setMinutes] = useState(totalDuration);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(totalDuration * 60);
  const [isPaused, setIsPaused] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);
  const [inShortBreak, setInShortBreak] = useState(false);
  const [shortBreakSeconds, setShortBreakSeconds] = useState(shortBreak * 60);
  const [inLongBreak, setInLongBreak] = useState(false);
  const [longBreakSeconds, setLongBreakSeconds] = useState(longBreak * 60);

  useEffect(() => {
    setMinutes(totalDuration);
    setTotalSeconds(totalDuration * 60);
    setShortBreakSeconds((shortBreakSeconds) => shortBreakSeconds * 60);
  }, [totalDuration, longBreak, shortBreak, isCompleted]);

  const startTimer = () => {
      toggle();
      setIsPaused((state) => !state);
    },
    getRemaingTime = (totalSeconds) => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
    },
    resetTimer = () => {
      inShortBreak && setMinutes(longBreak);
      inLongBreak && setMinutes(shortBreak);
      setMinutes(totalDuration);
      setTotalSeconds(totalDuration * 60);

      setSeconds(0);
      setIsPaused(true);
    },
    handleShortBreak = () => {
      if (totalSeconds <= Math.floor(totalDuration * 60 * 0.75)) {
        setIsPaused(true);
        setInShortBreak(true);
        setInLongBreak(false);
        setRemainingTime(totalSeconds / 60);
        setMinutes(shortBreak);
        setSeconds(0);
      } else {
        toggleError();
        toast.warn(
          "You need to complete 25% of the task to take a short break"
        );
      }
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
        toggleError();
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
    let myInterval;
    if (!isPaused) {
      document.title = `${getRemaingTime(totalSeconds)} | Kaam Se Kaam`;
      myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        }
        setTotalSeconds((state) => state - 1);
      }, 1000);
    } else {
      clearInterval(myInterval);
    }
    return () => {
      clearInterval(myInterval);
      if (totalSeconds <= 1) {
        setTaskCompleted(true);
        toggleClap();
      }
    };
  }, [totalSeconds, isPaused]);

  useEffect(() => {
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
            strokeLinecap: "butt",
            pathTransitionDuration: 0.5,
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
          text={getRemaingTime(totalSeconds)}
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

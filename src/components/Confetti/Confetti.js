import React, { useCallback, useRef, useState, useEffect } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const Confetti = ({ showConfetti }) => {
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();
  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  function getAnimationSettings(originXA, originXB) {
    return {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
      particleCount: 150,
      origin: {
        x: randomInRange(originXA, originXB),
        y: Math.random() - 0.2,
      },
    };
  }
  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 400));
    }
  }, [intervalId, nextTickAnimation]);

  const pauseAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
  }, [intervalId]);
  const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  };

  useEffect(() => {
    showConfetti ? startAnimation() : pauseAnimation();
  }, [showConfetti]);

  return <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />;
};

export default Confetti;

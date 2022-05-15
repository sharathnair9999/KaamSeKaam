import { useRef, useState, useEffect } from "react";

const useClickOutside = (initialVisibleState) => {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialVisibleState);
  const ref = useRef(null);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
};

export default useClickOutside;

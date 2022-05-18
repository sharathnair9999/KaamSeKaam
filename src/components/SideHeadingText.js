import React from "react";

const SideHeadingText = ({
  heading,
  condition,
  text,
  satisfiedText,
  notSatisfiedText,
  smallText,
  largeText,
}) => {
  return (
    <p
      className={`side-heading-text ${smallText && "font-sm"} ${
        largeText && "font-lg"
      } `}
    >
      <span>{heading}</span>
      {(condition === true || condition === false) && (
        <span className={`${condition ? "text-success" : "text-danger"} bold`}>
          {condition ? satisfiedText : notSatisfiedText}
        </span>
      )}
      {text && <span className={` bold`}>{text}</span>}
    </p>
  );
};

export default SideHeadingText;

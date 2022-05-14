import React from "react";
const SelectAvatar = ({ credentials, setCredentials, id, thisAvatar }) => {
  return (
    <label
      htmlFor={id}
      className={`${
        credentials.photoURL === thisAvatar && "selected-avatar"
      } select-avatar`}
    >
      <input
        type="checkbox"
        name="avatar"
        id={id}
        checked={credentials.photoURL === thisAvatar}
        onChange={(e) =>
          e.target.checked &&
          setCredentials((data) => ({
            ...data,
            photoURL: thisAvatar,
          }))
        }
      />
      <img src={thisAvatar} alt={id} />
    </label>
  );
};

export default SelectAvatar;

import React, { useState } from "react";
import "./InputField.css";

const InputField = ({ legend, type, ...others }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <fieldset className="input-field">
      <legend>{legend}</legend>
      <section>
        <input type={showPassword ? "text" : type} {...others} />
        {type === "password" && (
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </section>
    </fieldset>
  );
};

export default InputField;

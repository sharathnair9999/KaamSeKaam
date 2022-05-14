import React, { useState } from "react";
import "./InputField.css";
import { BiShow, BiHide } from "react-icons/bi";

const InputField = ({ legend, type, ...others }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <fieldset className="input-field">
      <legend>{legend}</legend>
      <section>
        <input type={showPassword ? "text" : type} {...others} />
        {type === "password" && (
          <button
            type="button"
            className="show-hide"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <BiHide /> : <BiShow />}
          </button>
        )}
      </section>
    </fieldset>
  );
};

export default InputField;

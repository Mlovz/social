import React, { forwardRef } from "react";
import "./checkbox.scss";

const CheckBox = forwardRef(({ id, name, label, checked, ...rest }, ref) => {
  return (
    <label htmlFor={id} className="checkBox">
      <div className="checkBox__input">
        <input
          type="checkbox"
          name={name}
          id={id}
          checked={checked || false}
          ref={ref}
          {...rest}
        />
        <div className="checkBox_checked"></div>
      </div>
      <span>{label}</span>
    </label>
  );
});

export default CheckBox;

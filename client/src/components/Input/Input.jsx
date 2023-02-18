import React, { forwardRef, useState } from "react";
import "./input.scss";

const Input = (
  {
    type = "text",
    value,
    name,
    error,
    id,
    placeholder,
    required = false,
    password,
    onChange,
    formType,

    ...rest
  },
  ref
) => {
  const [typePass, setTypePass] = useState(false);
  return (
    <label className={`field  ${value ? "active" : ""}`} id={id}>
      {formType === "textarea" ? (
        <textarea
          id={id || ""}
          name={name || ""}
          value={value ? value : ""}
          className={`field_textarea ${error ? "error" : ""}`}
          type={type === "text" || typePass ? "text" : type}
          required={required ? required : false}
          onChange={onChange}
          ref={ref && ref}
          {...rest}
        />
      ) : (
        <input
          id={id || ""}
          name={name || ""}
          value={value ? value : ""}
          className={`field_input ${error ? "error" : ""}`}
          type={type === "text" || typePass ? "text" : type}
          required={required ? required : false}
          onChange={onChange}
          ref={ref && ref}
          {...rest}
        />
      )}

      <div
        className={`field_label ${error ? "error" : ""} ${
          formType === "textarea" ? "textarea" : ""
        }`}
      >
        {placeholder}
        {required && <span className="field_danger">*</span>}
      </div>
      {type === "password" && (
        <svg
          className="field_eye"
          width="25"
          height="20"
          viewBox="0 0 25 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setTypePass(!typePass)}
        >
          <path
            d="M0 9.99977C4.50584 -0.588463 20.4153 -0.588464 24.3529 9.99977C20.4153 20.588 4.50584 20.588 0 9.99977Z"
            fill="#E6E6E6"
          />
          <circle
            cx="12.1764"
            cy="10.0001"
            r="3.76471"
            fill="white"
            stroke="white"
            strokeWidth="2"
          />
          {!typePass && (
            <path d="M3.17651 1L21.1765 19" stroke="#E6E6E6" strokeWidth="2" />
          )}
        </svg>
      )}
    </label>
  );
};

export default forwardRef(Input);

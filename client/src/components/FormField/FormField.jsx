import { forwardRef } from "react";
import Input from "../Input/Input";
import "./form-field.scss";

const FormField = forwardRef(
  (
    {
      id,
      type = "text",
      value,
      placeholder,
      required = false,
      error,
      onChange,
      formType = "input",
      disabled,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`form-field ${error ? "form-field--mb_0" : ""}`}>
        <Input
          id={id || ""}
          type={type}
          ref={ref}
          value={value || ""}
          placeholder={placeholder}
          error={error}
          onChange={onChange}
          required={required}
          disabled={disabled}
          formType={formType}
          {...rest}
        />

        {error?.message && (
          <span className="fs_12 error__text">{error?.message}</span>
        )}
      </div>
    );
  }
);

export default FormField;

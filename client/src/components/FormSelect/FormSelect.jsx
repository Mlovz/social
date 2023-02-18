import { clickDropDown } from "helpers/clickDropDown";
import { memo, useRef, useEffect } from "react";
import "./form-select.scss";

const FormSelect = ({
  setSelect,
  label,
  data,
  select,
  className,
  required = true,
}) => {
  const selectToggleRef = useRef();
  const selectContentRef = useRef();

  const checkSelect = (payload) => {
    setSelect(payload);
    selectContentRef.current.classList.remove("active");
  };

  useEffect(() => {
    clickDropDown(selectToggleRef, selectContentRef);
  }, [selectToggleRef, selectContentRef]);

  return (
    <div className={`field ${select ? "active" : ""} ${className || ""}`}>
      <div ref={selectToggleRef} className="field_select">
        <div className="field_label">
          {label}
          {required && <span className="field_danger">*</span>}
        </div>

        <div className={`field_input`}>
          {select ? select : <div></div>}
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`field__input__svg `}
          >
            <path
              d="M11 1L6 6L1 1"
              stroke={select ? "#1A1A1A" : "#b2b2b2"}
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>

      <div ref={selectContentRef} className={`field_content `}>
        {data?.map((item, index) => (
          <div
            key={index}
            className="field_content_item fs_16"
            onClick={() => checkSelect(item.name)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(FormSelect);

import React from "react";

const Toast = ({ msg, body, onClick }) => {
  return (
    <div className={`toast ${msg === "Error" ? "error" : "success"}`}>
      <div>
        <h2 className="toast_title ">{msg}</h2>
        <p className="toast_text">{body}</p>

        <span className="toast_close" onClick={onClick}>
          &times;
        </span>
      </div>
    </div>
  );
};

export default Toast;

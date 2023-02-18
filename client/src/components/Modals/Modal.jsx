import React from "react";
import { createPortal } from "react-dom";
import "./modal.scss";

const Modal = ({ onClose, open, type, children }) => {
  return createPortal(
    <div className={`popup ${open && "popup--active"}`}>
      <div className={`popup_bg`} onClick={(e) => e.stopPropagation()}></div>
      <div
        className={`popup_window ${open && "popup_window--active"} ${
          type || ""
        }`}
      >
        <div className="popup_close" onClick={onClose}></div>
        <div className="popup_content">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

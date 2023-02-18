import React, { memo } from "react";
import "./icon.scss";
import { iconTypes } from "./IconType";

const getIcon = (type) => iconTypes.get(type);

const IconComponent = ({ className, size, type, onClick, ...rest }) => {
  return (
    <div className={`icon ${className || ""}`} onClick={onClick} {...rest}>
      {getIcon(type)}
    </div>
  );
};

export const Icon = memo(IconComponent);

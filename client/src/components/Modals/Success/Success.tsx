import React from "react";
import "./success.scss";
import { Icon, Heading } from "@/common";

interface ISuccessProps {
  title: string;
  // desc: string;
  children: React.ReactNode;
}

const Success: React.FC<ISuccessProps> = ({ title, children }) => {
  return (
    <div className="success">
      <Icon type="SuccessIcon" />

      <Heading component="h1" type="auth">
        {title}
      </Heading>

      <p>{children}</p>
    </div>
  );
};

export default Success;

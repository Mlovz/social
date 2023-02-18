import React from "react";
import "./logout-modal.scss";
import { Button, Heading } from "@/common";

interface ILogoutModalProps {
  onClose: () => void;
  handleLogout: () => void;
}

const LogoutModal: React.FC<ILogoutModalProps> = ({
  onClose,
  handleLogout,
}) => {
  return (
    <div className="logout-modal">
      <Heading component="h1" type="auth center">
        Выйти
      </Heading>

      <p>Вы уверены, что хотите выйти из аккаунта?</p>

      <div className="logout-modal_footer">
        <Button variant="close" onClick={onClose}>
          Отмена
        </Button>
        <Button onClick={handleLogout}>Выйти</Button>
      </div>
    </div>
  );
};

export default LogoutModal;

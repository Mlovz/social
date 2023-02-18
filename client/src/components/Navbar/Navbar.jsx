import React from "react";
import "./navbar.scss";
import Logo from "assets/logo.png";

import { Button, Form, Icon, Input, Login, Modal } from "components";
import NavList from "./NavList/NavList";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Register from "components/Modals/Auth/Register/Register";
import { AUTH_TYPES } from "redux/types/authTypes";
import Search from "./Search/Search";

const Navbar = () => {
  const dispatch = useDispatch();
  const authModal = useSelector((state) => state.authModal);
  const { auth, theme } = useSelector((state) => state);
  const { user, isAuth, token } = auth;
  const { view, open } = authModal;

  const onOpen = () => {
    dispatch({ type: AUTH_TYPES.MODAL, payload: { ...authModal, open: true } });
  };

  const onClose = () => {
    dispatch({
      type: AUTH_TYPES.MODAL,
      payload: { ...authModal, open: false },
    });
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar_wrap">
          <Link to="/" className="navbar_logo">
            <img src={Logo} alt="" />
          </Link>

          <Search token={token} />

          {isAuth && user ? (
            <NavList id={user._id} avatar={user?.avatar} theme={theme} />
          ) : (
            <div className="navbar_btns">
              <Button className="outline" onClick={onOpen}>
                Sign In
              </Button>
            </div>
          )}
        </div>

        <Modal open={open} onClose={onClose}>
          {view === "login" && <Login />}
          {view === "register" && <Register />}
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;

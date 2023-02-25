import React, { useRef, useState, useEffect } from "react";
import { Avatar, Icon, Modal, NotifyDrop, PostModal } from "components";
import { Link } from "react-router-dom";
import { navList } from "./constants";
import User from "assets/user.png";

import "./nav-list.scss";
import { clickDropDown, closeDropDown } from "helpers/clickDropDown";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "redux/actions/authAction";
import { GLOBAL_TYPES } from "redux/types/globalTypes";
import { isReadNotify } from "redux/actions/notifyAction";

const NavList = ({ avatar, id, theme }) => {
  const userToggleRef = useRef(null);
  const userContentRef = useRef(null);
  const notifyToggleRef = useRef(null);
  const notifyContentRef = useRef(null);
  const { status: open, notify, auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    clickDropDown(userToggleRef, userContentRef);
  }, [userToggleRef, userContentRef]);

  useEffect(() => {
    clickDropDown(notifyToggleRef, notifyContentRef);
  }, [notifyToggleRef, notifyContentRef]);

  const onOpen = () => {
    dispatch({ type: GLOBAL_TYPES.STATUS, payload: true });
  };

  const onClose = () => {
    dispatch({ type: GLOBAL_TYPES.STATUS, payload: false });
  };

  const onCloseNotify = (msg) => {
    dispatch(isReadNotify({ msg, auth }));

    closeDropDown(notifyToggleRef, notifyContentRef);
  };

  return (
    <nav className="nav">
      <ul className="nav_list">
        {navList.map((item, index) => (
          <li className="nav_list_item" key={index}>
            <Link to={item.to} className="nav_list_link">
              <Icon type={item.iconType} />
            </Link>
          </li>
        ))}
        <li className="nav_list_item" onClick={onOpen}>
          <div className="nav_list_link">
            <Icon type="Add" />
          </div>
        </li>
        <li className="nav_list_item">
          <div className="nav_list_link" ref={notifyToggleRef}>
            <Icon type="Favorite" />
            {notify.data?.length > 0 && (
              <span className="nav_list_link_bage">{notify.data?.length}</span>
            )}
          </div>
          <NotifyDrop
            ref={notifyContentRef}
            notify={notify}
            auth={auth}
            onClose={onCloseNotify}
          />
        </li>

        <li className="nav_list_item" ref={userToggleRef}>
          <div className="nav_list_link">
            <Avatar
              src={avatar}
              size=""
              style={{ filter: theme ? "invert(1)" : "invert(0)" }}
            />
          </div>

          <ul className="nav_list_user" ref={userContentRef}>
            <li>
              <Link className="nav_list_user_link" to={`/profile/${id}`}>
                Profile
              </Link>
            </li>
            <li>
              <label
                htmlFor="theme"
                className="nav_list_user_link"
                onClick={() =>
                  dispatch({ type: GLOBAL_TYPES.THEME, payload: !theme })
                }
              >
                {theme ? "Light Mode" : "Dark Mode"}
              </label>
            </li>
            <li onClick={logout}>
              <div className="nav_list_user_link">Logout</div>
            </li>
          </ul>
        </li>
      </ul>

      <Modal open={open} onClose={onClose} type="medium">
        <PostModal />
      </Modal>
    </nav>
  );
};

export default NavList;

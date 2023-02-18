import React, { useRef, useEffect } from "react";
import { Avatar, Icon } from "components";
import { Link } from "react-router-dom";
import { navList } from "./constants";
import User from "assets/user.png";

import "./nav-list.scss";
import { clickDropDown } from "helpers/clickDropDown";
import { useDispatch } from "react-redux";
import { logoutUser } from "redux/actions/authAction";
import { GLOBAL_TYPES } from "redux/types/globalTypes";

const NavList = ({ avatar, id, theme }) => {
  const userToggleRef = useRef(null);
  const userContentRef = useRef(null);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    clickDropDown(userToggleRef, userContentRef);
  }, [userToggleRef, userContentRef]);

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
        <li className="nav_list_item">
          <div className="nav_list_link">
            <Icon type="Add" />
          </div>
        </li>
        <li className="nav_list_item">
          <div className="nav_list_link">
            <Icon type="Favorite" />
          </div>
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
    </nav>
  );
};

export default NavList;

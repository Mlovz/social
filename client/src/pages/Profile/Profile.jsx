import React from "react";
import { useSelector } from "react-redux";
import Info from "./Info/Info";

import "./profile.scss";

const Profile = () => {
  const { loading } = useSelector((state) => state.profile);

  return <div className="profile">{loading ? <div></div> : <Info />}</div>;
};

export default Profile;

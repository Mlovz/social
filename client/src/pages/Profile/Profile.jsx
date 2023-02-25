import { Icon } from "components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileUser } from "redux/actions/profileAction";
import Info from "./Info/Info";
import Posts from "./Posts/Posts";
import SavedPosts from "./SavedPosts/SavedPosts";

import Spinner from "components/Spinner/Spinner";
import "./profile.scss";

const Profile = () => {
  const [tab, setTab] = useState(false);
  const { profile, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (auth?.token) {
      if (profile.ids.every((item) => item !== id)) {
        dispatch(getProfileUser({ id, auth }));
      }
    }
  }, [id, profile.ids, dispatch, auth]);

  return (
    <div className="profile">
      {profile.loading ? (
        <Spinner />
      ) : (
        <>
          <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

          <div className="profile_tabs">
            <button
              className={`profile_tab ${!tab ? "active" : ""}`}
              onClick={() => setTab(false)}
            >
              <Icon type="Posts" />
            </button>
            <button
              className={`profile_tab ${tab ? "active" : ""}`}
              onClick={() => setTab(true)}
            >
              <Icon type="Contact" />
            </button>
          </div>

          {tab ? (
            <SavedPosts
              auth={auth}
              profile={profile}
              dispatch={dispatch}
              id={id}
            />
          ) : (
            <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;

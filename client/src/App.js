import { Notify } from "components";
import Navbar from "components/Navbar/Navbar";
import {
  Conversation,
  Discover,
  Home,
  Message,
  Post,
  Profile,
  RightSide,
} from "pages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { refreshToken } from "redux/actions/authAction";
import { getNotifies } from "redux/actions/notifyAction";
import { getPosts } from "redux/actions/postAction";
import { getSuggestions } from "redux/actions/suggestionsAction";
import { GLOBAL_TYPES } from "redux/types/globalTypes";
import { PrivateRoute } from "router/PrivateRoute";
import { io } from "socket.io-client";
import SocketClient from "SocketClient";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();
    dispatch({ type: GLOBAL_TYPES.SOCKET, payload: socket });

    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
        }
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <input type="checkbox" id="theme" />

      <div className={`app `}>
        <Navbar />
        <Notify />
        {auth.token && <SocketClient />}
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route path="/post/:id" element={<Post />} />
              <Route path="/profile/:id" element={<Profile />} />

              <Route path="/compass" element={<Discover />} />
              <Route path="/messages" element={<Message />}>
                <Route index element={<RightSide />} />
                <Route path="/messages/:id" element={<Conversation />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

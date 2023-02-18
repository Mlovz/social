import React, { useEffect } from "react";
import Navbar from "components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Profile } from "pages";
import { Notify } from "components";
import { useDispatch } from "react-redux";
import { refreshToken } from "redux/actions/authAction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className={`app `}>
        <input type="checkbox" id="theme" />
        <Navbar />
        <Notify />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

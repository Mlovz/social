import React, { useState, useEffect } from "react";
import "./conversation.scss";

import UserCard from "components/Cards/UserCard/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Icon } from "components";
import MsgDisplay from "./MsgDisplay/MsgDisplay";

const Conversation = () => {
  const [user, setUser] = useState({});
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { message, auth } = useSelector((state) => state);
  const { id } = useParams();

  useEffect(() => {
    const newUser = message.users.find((user) => user._id === id);

    if (newUser) setUser(newUser);
  }, [message.users, id]);

  return (
    <div className="convers">
      <div className="convers_header">
        {user._id && (
          <UserCard user={user}>
            <div className="convers_header_icons">
              <Icon type="Call" />
              <Icon type="Video" />
              <Icon type="Trash" />
            </div>
          </UserCard>
        )}
      </div>

      <div className="chat_container">
        <div className="chat_display">
          <div className="chat_row other_message">
            <MsgDisplay user={user} />
          </div>
          <div className="chat_row you_message">
            <MsgDisplay user={auth.user} />
          </div>
        </div>
      </div>

      <form className="chat_input">
        <input
          type="text"
          placeholder="Enter you message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit">
          <Icon type="Messanger" />
        </button>
      </form>
    </div>
  );
};

export default Conversation;

import React, { useState } from "react";
import UserCard from "components/Cards/UserCard/UserCard";
import { useDispatch, useSelector } from "react-redux";
import "./left-side.scss";
import { Modal, UserSearch } from "components";
import { useNavigate, useParams } from "react-router-dom";
import { addUser } from "redux/actions/messageAction";

const LeftSide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { auth, message } = useSelector((state) => state);
  const { id } = useParams();
  const navigate = useNavigate();

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const handleUser = (user) => {
    dispatch(addUser({ user, message }));
    return navigate(`/messages/${user._id}`);
  };

  return (
    <div className="left-side">
      <div className="left-side_search" onClick={onOpen}>
        Click to search...
      </div>

      <ul className="left-side_list">
        {message.users?.map((user) => (
          <li
            key={user._id}
            className={`${id === user._id ? "active" : ""}`}
            onClick={() => handleUser(user)}
          >
            <UserCard user={user}>
              <span className="round round_small"></span>
            </UserCard>
          </li>
        ))}
      </ul>

      <Modal open={isOpen} onClose={onClose}>
        <UserSearch onClose={onClose} handleUser={handleUser} />
      </Modal>
    </div>
  );
};

export default LeftSide;

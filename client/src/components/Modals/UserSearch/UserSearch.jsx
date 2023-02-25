import React, { useEffect, useState } from "react";
import "./user-search.scss";

import { api } from "api";
import { Heading, Input } from "components";
import { useDispatch, useSelector } from "react-redux";
import { GLOBAL_TYPES } from "redux/types/globalTypes";
import UserCard from "components/Cards/UserCard/UserCard";
import { addUser } from "redux/actions/messageAction";
import { useNavigate } from "react-router-dom";

const UserSearch = ({ onClose, handleUser }) => {
  const dispatch = useDispatch();
  const { auth, message } = useSelector((state) => state);
  const [search, setSearch] = useState("");
  const [load, setLoad] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (search) {
      setLoad(true);
      api
        .get(`search?username=${search}`, auth.token)
        .then((res) => {
          setUsers(res.data.users);
          setLoad(false);
        })
        .catch((err) => {
          dispatch({
            type: GLOBAL_TYPES.ERROR,
            payload: err.response.data.msg,
          });
        });
    } else {
      setUsers([]);
    }
  }, [search, dispatch, auth.token]);

  const handleAddUser = (user) => {
    setSearch("");
    setUsers([]);
    handleUser(user);
    onClose();
  };

  return (
    <div className="user-search">
      <form>
        <Heading type="medium">Кому:</Heading>
        <Input
          placeholder="Enter to search..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />

        {!load && search && (
          <span className="user-search_close" onClick={() => setSearch("")}>
            &times;
          </span>
        )}
        {/* {load && } */}

        {search && (
          <ul className="user-search_list">
            {users.length === 0 ? (
              <h1 className="not_users">Ничего не найдено</h1>
            ) : (
              users?.map((user) => (
                <li onClick={() => handleAddUser(user)}>
                  <UserCard user={user} />
                </li>
              ))
            )}
          </ul>
        )}
      </form>
    </div>
  );
};

export default UserSearch;

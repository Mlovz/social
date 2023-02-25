import React, { useState, useEffect } from "react";
import { Form } from "components";
import "./search.scss";
import { api } from "api";
import { useDispatch } from "react-redux";
import { GLOBAL_TYPES } from "redux/types/globalTypes";
import Gif from "assets/loading.gif";
import UserCard from "components/Cards/UserCard/UserCard";
import { Link, useNavigate } from "react-router-dom";

const Search = ({ token }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase().replace(/ /g, ""));
  };

  useEffect(() => {
    if (search && token) {
      const getUsers = async () => {
        try {
          setLoading(true);
          const res = await api.get(`search?username=${search}`, token);
          if (res.data) {
            setLoading(false);
            setUsers(res.data.users);
          }
        } catch (err) {
          dispatch({ type: GLOBAL_TYPES.ERROR, payload: err.response.dat.msg });
          setLoading(false);
        }
      };

      getUsers();
    }
  }, [search, token, dispatch]);

  const onClose = () => {
    setSearch("");
    setUsers([]);
  };

  const profileNavigate = (id) => {
    navigate(`/profile/${id}`);
    setSearch("");
    setUsers([]);
  };

  return (
    <Form className="navbar_form">
      <input
        value={search}
        placeholder="Search for something here"
        onChange={handleChange}
      />

      {search && !loading && (
        <span className="navbar_form_close" onClick={onClose}>
          &times;
        </span>
      )}
      {loading && <img className="navbar_form_close" src={Gif} />}

      <div className={`navbar_form_users ${search ? "active" : ""}`}>
        {users.length === 0 ? (
          <h1>Ничего не найдено</h1>
        ) : (
          users?.map((user) => (
            <div
              className="navbar_form_user"
              onClick={() => profileNavigate(user._id)}
            >
              <UserCard key={user._id} user={user} />
            </div>
          ))
        )}
      </div>
    </Form>
  );
};

export default Search;

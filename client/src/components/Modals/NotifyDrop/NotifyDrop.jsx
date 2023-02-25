import React, { forwardRef } from "react";
import "./notify-drop.scss";
import Notify from "assets/notify.jpg";
import { Avatar, Button, Heading, Icon } from "components";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { NOTIFY_TYPES } from "redux/types/notifyTypes";
import { deleteAllNotifies } from "redux/actions/notifyAction";

const NotifyDrop = ({ notify, auth, onClose }, ref) => {
  const dispatch = useDispatch();

  const handleSound = () => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.isSound });
  };

  const handleDeleteAllNotify = () => {
    const newArr = notify.data.filter((item) => item.isRead === false);
    if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token));

    if (
      window.confirm(
        ` У вас есть ${newArr.length} непрочитанн(ое-ых) уведомлен(ие-ий). Вы уверены, что хотите удалить все? `
      )
    ) {
      return dispatch(deleteAllNotifies(auth.token));
    }
  };

  return (
    <div ref={ref} className="notify-drop">
      <div className="notify-drop_header">
        <Heading type="medium">Уведомления</Heading>
        {notify.isSound ? (
          <Icon type="VolumeMuted" onClick={handleSound} />
        ) : (
          <Icon type="Volume" onClick={handleSound} />
        )}
      </div>

      <div className="notify-drop_box">
        {notify.data?.map((msg) => (
          <Link
            to={msg.url}
            onClick={() => onClose(msg)}
            className="notify-drop_box_link"
            key={msg._id}
          >
            <div className="notify-drop_box_header">
              <Avatar src={msg.user.avatar} size="small" />
              <h6 className="fs_12">{msg.user.username}</h6>
              <p className="fs_14">{msg.text}...</p>
            </div>

            {msg.content && (
              <div className="notify-drop_box_body">
                <p className="fs_14">{msg.content.slice(0, 30)}...</p>
                <Avatar src={msg.image} size="small" />
              </div>
            )}

            <div className="notify-drop_box_footer">
              <span className="fs_12">{moment(msg.createdAt).fromNow()}</span>
              {!msg.isRead && <span className="round"></span>}
            </div>
          </Link>
        ))}
      </div>

      {notify.data?.length === 0 ? (
        <div className="notify-drop_img">
          <img src={Notify} alt="" />
        </div>
      ) : (
        <div className="notify-drop_footer">
          <Button className="outline" onClick={handleDeleteAllNotify}>
            Clear Notify
          </Button>
        </div>
      )}
    </div>
  );
};

export default forwardRef(NotifyDrop);

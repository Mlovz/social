import React, { useEffect } from "react";
import "./notify.scss";
import { useSelector, useDispatch } from "react-redux";

import Loading from "./Loading";
import Toast from "./Toast";
import { GLOBAL_TYPES } from "redux/types/globalTypes";

const Notify = () => {
  const { loading, error, success } = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error || success) {
      const time = setTimeout(() => {
        dispatch({ type: GLOBAL_TYPES.GLOBAL, payload: {} });
      }, 3000);

      return () => clearTimeout(time);
    }
  }, [error, loading, success, dispatch]);

  return (
    <>
      {loading && <Loading />}

      {error && (
        <Toast
          msg="Error"
          body={error}
          onClick={() => dispatch({ type: GLOBAL_TYPES.GLOBAL, payload: {} })}
        />
      )}

      {success && (
        <Toast
          msg="Success"
          body={success}
          onClick={() => dispatch({ type: GLOBAL_TYPES.GLOBAL, payload: {} })}
        />
      )}
    </>
  );
};

export default Notify;

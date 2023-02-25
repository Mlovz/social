export const GLOBAL_TYPES = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  LOADING: "LOADING",
  GLOBAL: "GLOBAL",
  THEME: "THEME",
  STATUS: "STATUS",
  SOCKET: "SOCKET",
};

export const EditData = (data, id, post) => {
  const newData = data.map((item) => (item._id === id ? post : item));
  return newData;
};

export const DeleteData = (data, id) => {
  const newData = data.filter((item) => item._id !== id);
  return newData;
};

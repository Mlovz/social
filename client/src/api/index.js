import axios from "axios";

export const api = {
  get: async (url, token) => {
    const res = await axios.get(`/api/${url}`, {
      headers: { Authorization: token },
    });
    return res;
  },
  post: async (url, post, token) => {
    const res = await axios.post(`/api/${url}`, post, {
      headers: { Authorization: token },
    });
    return res;
  },
  put: async (url, post, token) => {
    const res = await axios.put(`/api/${url}`, post, {
      headers: { Authorization: token },
    });
    return res;
  },
  patch: async (url, post, token) => {
    const res = await axios.patch(`/api/${url}`, post, {
      headers: { Authorization: token },
    });
    return res;
  },
  delete: async (url, token) => {
    const res = await axios.delete(`/api/${url}`, {
      headers: { Authorization: token },
    });
    return res;
  },
};

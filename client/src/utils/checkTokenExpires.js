import jwt_decode from "jwt-decode";

export const tokenExp = (token) => {
  const decoded = jwt_decode(token);
  let tokenExpiredErr = "";

  if (decoded.exp <= Date.now() / 1000) {
    tokenExpiredErr = "Expired";
    return tokenExpiredErr;
  }
};

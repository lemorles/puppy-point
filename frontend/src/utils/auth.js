import jwtDecode from "jwt-decode";

const TOKEN = "token";

export const setToken = (token) => {
  localStorage.setItem(TOKEN, token);
};

export const getToken = () => {
  try {
    const token = localStorage.getItem(TOKEN);
    if (!token) return null;

    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const decodeToken = (token) => {
  return jwtDecode(token);
};

export const verifyToken = (token) => {
  const seconds = 60;
  const { iat } = decodeToken(token);
  const now = (Date.now() + seconds) / 1000;

  return now > iat;
};

export const getUserId = () => {
  try {
    const token = getToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded.id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAuth = () => {
  try {
    const token = getToken();
    if (!token) return null;

    const verifiedToken = verifyToken(token);
    if (!verifiedToken) return null;

    const decodedUser = decodeToken(token);
    if (!decodedUser) return null;

    return decodedUser;
  } catch (error) {
    console.log(error);
  }
};

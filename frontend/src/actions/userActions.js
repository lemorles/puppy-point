import axios from "axios";
import jwtDecode from "jwt-decode";
import { URL_BASE } from "../config";
import {
  CREATE_USER_PENDING,
  CREATE_USER_REJECT,
  CREATE_USER_SUCCESS,
  SELECT_OPTION_REGISTER,
  EDIT_USER_PENDING,
  EDIT_USER_REJECT,
  EDIT_USER_SUCCESS,
  GET_ALL_USERS_PENDING,
  GET_ALL_USERS_REJECTED,
  GET_ALL_USERS_SUCCESS,
  GET_USER_BY_ID_PENDING,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_REJECT,
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_REJECT,
  LOGOUT_USER,
  SAVE_TOKEN_IN_LOCAL_STORAGE,
  LOGIN_WITH_GOOGLE_PENDING,
  LOGIN_WITH_GOOGLE_SUCCESS,
  LOGIN_WITH_GOOGLE_REJECT,
  PASSWORD_EDIT_PENDING,
  PASSWORD_EDIT_REJECT,
  PASSWORD_EDIT_SUCCESS,
  ROL_EDIT_PENDING,
  ROL_EDIT_SUCCESS,
  ROL_EDIT_REJECT,
  SEARCH_USER_BY_NAME_PENDING,
  SEARCH_USER_BY_NAME_REJECT,
  SEARCH_USER_BY_NAME_SUCCESS,
  STATUS_EDIT_PENDING,
  STATUS_EDIT_SUCCESS,
  STATUS_EDIT_REJECT,
  userTypes,
  FORCE_PASSWORD_PENDING,
  FORCE_PASSWORD_SUCCESS,
  FORCE_PASSWORD_REJECT,
} from "../types/userTypes";
import { getToken } from "../utils/auth";

export const createUser = (input, history, pathname, addToast, setUser) => {
  return async function (dispatch) {
    dispatch({ type: CREATE_USER_PENDING });
    try {
      const json = await axios.post(`${URL_BASE}/users/register`, input);
      localStorage.setItem("token", json.data.token);
      setUser(jwtDecode(json.data.token));
      console.log("register");
      history.push(pathname);
      dispatch({ type: CREATE_USER_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: CREATE_USER_REJECT, payload: err.response.data });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

export const selectOptionRegister = (option = "owner") => {
  return {
    type: SELECT_OPTION_REGISTER,
    payload: option,
  };
};

export const editUser = (payload, history, path, addToast, setUser) => {
  return async function (dispatch) {
    dispatch({ type: EDIT_USER_PENDING });
    try {
      const json = await axios.put(`${URL_BASE}/users/${payload.id}`, payload);
      dispatch({ type: EDIT_USER_SUCCESS, payload: json.data });
      localStorage.setItem("token", json.data.token);
      setUser(jwtDecode(json.data.token));
      addToast({
        title: "Éxito",
        description: "Usuario actualizado",
        status: "success",
      });
      history.push(path);
    } catch (err) {
      dispatch({ type: EDIT_USER_REJECT, payload: err });
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_USERS_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/users`);
      return dispatch({ type: GET_ALL_USERS_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: GET_ALL_USERS_REJECTED, payload: err });
    }
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_BY_ID_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/users/${id}`);
      return dispatch({
        type: GET_USER_BY_ID_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_USER_BY_ID_REJECT });
    }
  };
};

export const loginUser = (input, history, pathname, addToast, setUser) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER_PENDING });
    try {
      const json = await axios.post(`${URL_BASE}/users/login`, input);
      localStorage.setItem("token", json.data.token);
      setUser(jwtDecode(json.data.token));
      console.log("login");
      history.push(pathname);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: LOGIN_USER_REJECT, payload: err.response.data });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

export const logoutUser = (history, path) => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("store");
    history.push(path);
    return {
      type: LOGOUT_USER,
    };
  } catch (err) {
    console.log(err);
  }
};

export const loginWithGoogle = (input, history, path, addToast, setUser) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_WITH_GOOGLE_PENDING });
    try {
      const json = await axios.post(
        `${URL_BASE}/users/login-with-google`,
        input
      );
      localStorage.setItem("token", json.data.token);
      setUser(jwtDecode(json.data.token));
      console.log("google");
      history.push(path);
      dispatch({ type: LOGIN_WITH_GOOGLE_SUCCESS, payload: json.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: LOGIN_WITH_GOOGLE_REJECT, payload: err.response });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

export const saveTokenInLocalStorage = () => {
  return {
    type: SAVE_TOKEN_IN_LOCAL_STORAGE,
    payload: getToken(),
  };
};

export const passwordEdit = (payload, history, path, addToast) => {
  return async (dispatch) => {
    dispatch({ type: PASSWORD_EDIT_PENDING });
    try {
      const json = await axios.put(
        `${URL_BASE}/users/password/${payload.id}`,
        payload
      );
      history.push(path);
      addToast({
        title: "Éxito",
        description: "Contraseña actualizada",
        status: "success",
      });
      dispatch({ type: PASSWORD_EDIT_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: PASSWORD_EDIT_REJECT, payload: err.response.data });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

export const editRol = (id, role) => {
  return async (dispatch) => {
    dispatch({ type: ROL_EDIT_PENDING });
    try {
      const json = await axios.put(`${URL_BASE}/users/role/${id}`, role);

      dispatch({ type: ROL_EDIT_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: ROL_EDIT_REJECT, payload: err });
    }
  };
};

export const getUsersByName = (input) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_USER_BY_NAME_PENDING });
    try {
      const json = await axios.get(
        `${URL_BASE}/users?fullName=${input.fullName}&role=${input.role}&order=${input.order}`
      );
      return dispatch({
        type: SEARCH_USER_BY_NAME_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: SEARCH_USER_BY_NAME_REJECT });
    }
  };
};

export const forgotPassword = (input, addToast) => {
  return async (dispatch) => {
    dispatch({ type: userTypes.FORGOT_PASSWORD_PENDING });
    try {
      const json = await axios.post(`${URL_BASE}/users/password/reset`, input);
      dispatch({
        type: userTypes.FORGOT_PASSWORD_SUCCESS,
        payload: json.data.msg,
      });
      addToast({
        title: "Exito",
        description: json.data.msg,
        status: "success",
      });
    } catch (err) {
      dispatch({
        type: userTypes.FORGOT_PASSWORD_REJECT,
        payload: err.response.data.msg,
      });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

export const resetPassword = (input, token, addToast) => {
  return async (dispatch) => {
    dispatch({ type: userTypes.RESET_PASSWORD_PENDING });
    try {
      const json = await axios.post(
        `${URL_BASE}/users/password/reset/${token}`,
        input
      );
      dispatch({
        type: userTypes.RESET_PASSWORD_SUCCESS,
        payload: json.data,
      });
      addToast({
        title: "Exito",
        description: json.data.msg,
        status: "success",
      });
    } catch (err) {
      dispatch({
        type: userTypes.RESET_PASSWORD_REJECT,
        payload: err.response.data.msg,
      });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

export const deactivateAccount = (input, id, history, addToast) => {
  return async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_USER_STATUS_PENDING });
    try {
      const json = await axios.put(`${URL_BASE}/users/status/${id}`, input);
      dispatch({
        type: userTypes.UPDATE_USER_STATUS_SUCCESS,
        payload: json.data,
      });
      addToast({
        title: "Exito",
        description: "Cuenta desactivada con éxito",
        status: "success",
      });
      dispatch(logoutUser(history, "/"));
    } catch (err) {
      dispatch({
        type: userTypes.UPDATE_USER_STATUS_REJECT,
        payload: err.response.data.msg,
      });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

export const editUserStatus = (id, status, addToast) => {
  return async (dispatch) => {
    dispatch({ type: STATUS_EDIT_PENDING });
    try {
      const json = await axios.put(`${URL_BASE}/users/status/${id}`, status);
      addToast({
        title: "Exito",
        description: "Estado de la cuenta modificado",
        status: "success",
      });
      dispatch({ type: STATUS_EDIT_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: STATUS_EDIT_REJECT, payload: err });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

export const getAllActiveUsers = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_USERS_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/users/active`);
      return dispatch({ type: GET_ALL_USERS_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: GET_ALL_USERS_REJECTED, payload: err });
    }
  };
};

export const ResetPasswordAdmin = (email, addToast) => {
  return async (dispatch) => {
    dispatch({ type: FORCE_PASSWORD_PENDING });
    try {
      const json = await axios.post(`${URL_BASE}/users/password/force`, {
        email,
      });
      dispatch({
        type: FORCE_PASSWORD_SUCCESS,
        payload: json.data.msg,
      });
      addToast({
        title: "Exito",
        description: "Se le envio un correo al usuario",
        status: "success",
      });
    } catch (err) {
      dispatch({
        type: FORCE_PASSWORD_REJECT,
        payload: err.response.data.msg,
      });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

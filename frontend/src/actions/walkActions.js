//IMPORT
import axios from "axios";
import { URL_BASE } from "../config";

import {
  /*   GET_WALK_TO_WALKER, */
  walkTypes,
  /*   POST_NEW_WALK, */
  GET_WALK_BY_ID_PENDING,
  GET_WALK_BY_ID_SUCCESS,
  GET_WALK_BY_ID_REJECT,
  GET_WALKS_PENDING,
  GET_WALKS_SUCCESS,
  GET_WALKS_REJECT,
  GET_MYWALKS_PENDING,
  GET_MYWALKS_SUCCESS,
  GET_MYWALKS_REJECT,
  EDIT_WALKS_PENDING,
  EDIT_WALKS_REJECT,
  EDIT_WALKS_SUCCESS,
  DELETE_WALKS_BY_ID_PENDING,
  DELETE_WALKS_BY_ID_REJECT,
  DELETE_WALKS_BY_ID_SUCCESS,
  INACTIVE_WALK_BY_ID_PENDING,
  INACTIVE_WALK_BY_ID_SUCCESS,
  INACTIVE_WALK_BY_ID_REJECT,
} from "../types/walkTypes";

//-------------------------------------------------------------------------------
export function getMyWalks(id, query, order) {
  const orderQuery = order ? `${!query ? "?" : "&"}order=${order}` : "";

  return async function (dispatch) {
    dispatch({ type: GET_MYWALKS_PENDING });
    try {
      const json = await axios.get(
        `${URL_BASE}/walks/users/${id}${query}${orderQuery}`
      );
      return dispatch({
        type: GET_MYWALKS_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_MYWALKS_REJECT });
    }
  };
}

// funcion dispachadora que postea en la base de datos los nuevos paseos
export const createWalk = (newWalk, history, path, addToast) => {
  return async (dispatch) => {
    dispatch({ type: walkTypes.CREATE_NEW_WALK_PENDING });
    try {
      const json = await axios.post(`${URL_BASE}/walks`, newWalk);
      dispatch({ type: walkTypes.CREATE_NEW_WALK_SUCCESS, payload: json.data });
      addToast({
        title: "Paseo creado",
        description: "El paseo se ha creado correctamente",
        status: "success",
      });
      history.push(path);
    } catch (err) {
      dispatch({
        type: walkTypes.CREATE_NEW_WALK_REJECT,
        payload: err.response.data,
      });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

export const getAllWalks = () => {
  return async (dispatch) => {
    dispatch({ type: GET_WALKS_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/walks`);
      return dispatch({ type: GET_WALKS_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: GET_WALKS_REJECT, payload: err.response.data });
    }
  };
};

export const getWalks = (query, province, order) => {
  const provinceQuery = province
    ? `${!query ? "?" : "&"}province=${province}`
    : "";

  const orderQuery = order ? `${!query ? "?" : "&"}order=${order}` : "";

  return async function (dispatch) {
    dispatch({ type: GET_WALKS_PENDING });
    try {
      const json = await axios.get(
        `${URL_BASE}/walks${query}${provinceQuery}${orderQuery}`
      );

      dispatch({ type: GET_WALKS_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: GET_WALKS_REJECT, payload: err.response.data });
    }
  };
};

//------------------------------------------------------------------------
// funcion que trae detalles del paseo seleccionado
export const getWalkById = (id) => {
  return async (dispatch) => {
    dispatch({ type: GET_WALK_BY_ID_PENDING });
    try {
      const { data } = await axios.get(`${URL_BASE}/walks/${id}`);
      dispatch({ type: GET_WALK_BY_ID_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: GET_WALK_BY_ID_REJECT });
    }
  };
};

export const editWalk = (payload) => {
  return async function (dispatch) {
    dispatch({ type: EDIT_WALKS_PENDING });
    try {
      const json = await axios.put(`${URL_BASE}/walks/${payload.id}`, payload);
      dispatch({ type: EDIT_WALKS_SUCCESS, payload: json.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: EDIT_WALKS_REJECT, payload: err.response.data });
    }
  };
};

export const deleteWalkById = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_WALKS_BY_ID_PENDING });
    try {
      const json = await axios.delete(`${URL_BASE}/walks/${id}`);
      return dispatch({
        type: DELETE_WALKS_BY_ID_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: DELETE_WALKS_BY_ID_REJECT });
    }
  };
};

export const inactiveWalkById = (id, history, path, addToast) => {
  return async (dispatch) => {
    dispatch({ type: INACTIVE_WALK_BY_ID_PENDING });
    try {
      const json = await axios.put(`${URL_BASE}/walks/inactive/${id}`);
      addToast({
        title: "Paseo desactivado",
        description: "El paseo se ha desactivado correctamente",
        status: "success",
      });
      history.push(path);
      dispatch({
        type: INACTIVE_WALK_BY_ID_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: INACTIVE_WALK_BY_ID_REJECT });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

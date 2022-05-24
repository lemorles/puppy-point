import axios from "axios";
import { URL_BASE } from "../config";
import {
  CREATE_DOG_PENDING,
  CREATE_DOG_SUCCESS,
  CREATE_DOG_REJECT,
  GET_DOGS_PENDING,
  GET_DOGS_SUCCESS,
  GET_DOGS_REJECT,
  GET_DOG_BY_ID_PENDING,
  GET_DOG_BY_ID_REJECT,
  GET_DOG_BY_ID_SUCCESS,
  DELETE_DOG_BY_ID_PENDING,
  DELETE_DOG_BY_ID_REJECT,
  DELETE_DOG_BY_ID_SUCCESS,
  EDIT_DOG_PENDING,
  EDIT_DOG_REJECT,
  EDIT_DOG_SUCCESS,
  GET_DOGS_BY_USER_PENDING,
  GET_DOGS_BY_USER_SUCCESS,
  GET_DOGS_BY_USER_REJECT,
  GET_BREEDS_PENDING,
  GET_BREEDS_SUCCESS,
  GET_BREEDS_REJECT,
  FILTER_DOGS_PENDING,
  FILTER_DOGS_SUCCESS,
  FILTER_DOGS_REJECT,
} from "../types/dogTypes";

export const createDog = (payload, history, path, addToast) => {
  return async function (dispatch) {
    dispatch({ type: CREATE_DOG_PENDING });
    try {
      const json = await axios.post(`${URL_BASE}/dogs`, payload);
      history.push(path);
      addToast({
        title: "Éxito",
        description: "Perro creado",
        status: "success",
      });
      dispatch({ type: CREATE_DOG_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: CREATE_DOG_REJECT, payload: err.response.data });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

export function getDogs(query) {
  return async function (dispatch) {
    dispatch({ type: GET_DOGS_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/dogs?${query}`);
      return dispatch({
        type: GET_DOGS_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_DOGS_REJECT });
    }
  };
}

export const getDogById = (id) => {
  return async (dispatch) => {
    dispatch({ type: GET_DOG_BY_ID_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/dogs/${id}`);
      return dispatch({
        type: GET_DOG_BY_ID_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_DOG_BY_ID_REJECT });
    }
  };
};

export const getDogsByUser = (id, query) => {
  return async (dispatch) => {
    dispatch({ type: GET_DOGS_BY_USER_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/dogs/users/${id}?${query}`);
      return dispatch({
        type: GET_DOGS_BY_USER_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_DOGS_BY_USER_REJECT });
    }
  };
};

export const deleteDogById = (id, addToast) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_DOG_BY_ID_PENDING });
    try {
      const json = await axios.delete(`${URL_BASE}/dogs/${id}`);
      dispatch({
        type: DELETE_DOG_BY_ID_SUCCESS,
        payload: json.data,
      });
      addToast({
        title: "Éxito",
        description: "Perro eliminado",
        status: "success",
      });
    } catch (err) {
      dispatch({ type: DELETE_DOG_BY_ID_REJECT });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

export const editDog = (payload, history, path, addToast) => {
  return async function (dispatch) {
    dispatch({ type: EDIT_DOG_PENDING });
    try {
      const json = await axios.put(`${URL_BASE}/dogs/${payload.id}`, payload);
      history.push(path);
      dispatch({ type: EDIT_DOG_SUCCESS, payload: json.data });
      addToast({
        title: "Éxito",
        description: "Perro modificado",
        status: "success",
      });
    } catch (err) {
      dispatch({ type: EDIT_DOG_REJECT, payload: err.response.data });
    }
  };
};

export const getBreeds = () => {
  return async function (dispatch) {
    dispatch({ type: GET_BREEDS_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/breeds`);
      return dispatch({
        type: GET_BREEDS_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_BREEDS_REJECT, payload: err });
    }
  };
};

export const getDogsFilter = (input) => {
  return async (dispatch) => {
    dispatch({ type: FILTER_DOGS_PENDING });
    try {
      const json = await axios.get(
        `${URL_BASE}/dogs?breed=${input.breed}&size=${input.size}&gender=${input.gender}`
      );
      return dispatch({
        type: FILTER_DOGS_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: FILTER_DOGS_REJECT });
    }
  };
};

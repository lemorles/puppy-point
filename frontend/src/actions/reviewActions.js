import axios from "axios";
import { URL_BASE } from "../config";

import {
  GET_WALKER_REVIEW_PENDING,
  GET_WALKER_REVIEW_SUCCESS,
  GET_WALKER_REVIEW_REJECT,
  CREATE_WALKER_REVIEW_PENDING,
  CREATE_WALKER_REVIEW_SUCCESS,
  CREATE_WALKER_REVIEW_REJECT,
  EDIT_WALKER_REVIEW_PENDING,
  EDIT_WALKER_REVIEW_SUCCESS,
  EDIT_WALKER_REVIEW_REJECT,
  DELETE_WALKER_REVIEW_PENDING,
  DELETE_WALKER_REVIEW_SUCCESS,
  DELETE_WALKER_REVIEW_REJECT,
} from "../types/reviewTypes";

export const getReviewsByWalkerId = (userId) => {
  return async function (dispatch) {
    dispatch({ type: GET_WALKER_REVIEW_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/review/user/${userId}`);
      dispatch({ type: GET_WALKER_REVIEW_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: GET_WALKER_REVIEW_REJECT });
    }
  };
};

export const createReview = (payload, userId, addToast) => {

  return async function (dispatch) {
    dispatch({ type: CREATE_WALKER_REVIEW_PENDING });
    try {
      const json = await axios.post(
        `${URL_BASE}/review/user/${userId}`,
        payload
      );
      dispatch({ type: CREATE_WALKER_REVIEW_SUCCESS, payload: json.data });
      addToast({
        title: "Éxito",
        description: "Reseña guardada",
        status: "success",
      });
    } catch (err) {
      dispatch({ type: CREATE_WALKER_REVIEW_REJECT });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

export const editReview = (userId, id, history, path) => {
  return async function (dispatch) {
    dispatch({ type: EDIT_WALKER_REVIEW_PENDING });
    try {
      const json = await axios.put(`${URL_BASE}/review/user/${userId}/${id}`);
      history.push(path);
      dispatch({ type: EDIT_WALKER_REVIEW_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: EDIT_WALKER_REVIEW_REJECT });
    }
  };
};

export const deleteReview = (id) => {
  return async function (dispatch) {
    dispatch({ type: DELETE_WALKER_REVIEW_PENDING });
    try {
      const json = await axios.delete(`${URL_BASE}/review/user/${id}`);
      return dispatch({
        type: DELETE_WALKER_REVIEW_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: DELETE_WALKER_REVIEW_REJECT });
    }
  };
};

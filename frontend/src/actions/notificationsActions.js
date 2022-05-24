import axios from "axios";
import { URL_BASE } from "../config";

import {
  CREATE_NOTIFICATION_PENDING,
  CREATE_NOTIFICATION_SUCCESS,
  CREATE_NOTIFICATION_REJECT,
  GET_NOTIFICATIONS_PENDING,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_REJECT,
  CHANGE_STATUS_NOTIFICATION_PENDING,
  CHANGE_STATUS_NOTIFICATION_SUCCESS,
  CHANGE_STATUS_NOTIFICATION_REJECT,
  DELETE_NOTIFICATION_PENDING,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_REJECT,
} from "../types/notificationTypes";

export const addNotification = (payload) => {
  return async function (dispatch) {
    dispatch({ type: CREATE_NOTIFICATION_PENDING });
    try {
      const json = await axios.post(`${URL_BASE}/notification/new`, payload);
      dispatch({ type: CREATE_NOTIFICATION_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({
        type: CREATE_NOTIFICATION_REJECT,
        payload: err.response.data,
      });
    }
  };
};

export const getNotifications = (id) => {
  return async (dispatch) => {
    dispatch({ type: GET_NOTIFICATIONS_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/notification/${id}`);
      return dispatch({
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_NOTIFICATIONS_REJECT });
    }
  };
};

export const changeStatusNotification = (id) => {
  return async (dispatch) => {
    dispatch({ type: CHANGE_STATUS_NOTIFICATION_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/notification/${id}`);
      return dispatch({
        type: CHANGE_STATUS_NOTIFICATION_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: CHANGE_STATUS_NOTIFICATION_REJECT });
    }
  };
};

export const deleteNotification = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_NOTIFICATION_PENDING });
    try {
      const json = await axios.delete(`${URL_BASE}/notification/${id}`);
      return dispatch({
        type: DELETE_NOTIFICATION_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: DELETE_NOTIFICATION_REJECT });
    }
  };
};

export const addNotificationCanceledReserve = (payload) => {
  return async function (dispatch) {
    dispatch({ type: CREATE_NOTIFICATION_PENDING });
    try {
      const json = await axios.post(`${URL_BASE}/notification/new`, payload);
      dispatch({ type: CREATE_NOTIFICATION_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({
        type: CREATE_NOTIFICATION_REJECT,
        payload: err.response.data,
      });
    }
  };
};

export const addNotificationCompletedReserve = (payload) => {
  return async function (dispatch) {
    dispatch({ type: CREATE_NOTIFICATION_PENDING });
    try {
      const json = await axios.post(`${URL_BASE}/notification/new`, payload);
      dispatch({ type: CREATE_NOTIFICATION_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({
        type: CREATE_NOTIFICATION_REJECT,
        payload: err.response.data,
      });
    }
  };
};

export const addNotificationNewUser = (payload) => {
  return async function (dispatch) {
    dispatch({ type: CREATE_NOTIFICATION_PENDING });
    try {
      const json = await axios.post(`${URL_BASE}/notification/new`, payload);
      dispatch({ type: CREATE_NOTIFICATION_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({
        type: CREATE_NOTIFICATION_REJECT,
        payload: err.response.data,
      });
    }
  };
};

export const addNotificationNewChat = (payload) => {
  return async function (dispatch) {
    dispatch({ type: CREATE_NOTIFICATION_PENDING });
    try {
      const json = await axios.post(`${URL_BASE}/notification/new`, payload);
      dispatch({ type: CREATE_NOTIFICATION_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({
        type: CREATE_NOTIFICATION_REJECT,
        payload: err.response.data,
      });
    }
  };
};

import axios from "axios";
import { URL_BASE } from "../config";

import {
  GET_MESSAGES_PENDING,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_REJECT,
  CREATE_MESSAGE_PENDING,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_REJECT,
  CLEAR_CHAT_SUCCESS,
} from "../types/chatTypes";

export const sendMessage = (payload) => {
  console.log(payload);
  return async function (dispatch) {
    dispatch({ type: CREATE_MESSAGE_PENDING });
    try {
      const json = await axios.post(
        `${URL_BASE}/chat/${payload.reserveId}`,
        payload
      );
      dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: json.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: CREATE_MESSAGE_REJECT, payload: err.response.data });
    }
  };
};

export const getChats = (id) => {
  return async (dispatch) => {
    dispatch({ type: GET_MESSAGES_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/chat/${id}`);
      return dispatch({
        type: GET_MESSAGES_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_MESSAGES_REJECT });
    }
  };
};

export const clearChat = () => {
  return async function (dispatch) {
    dispatch({ type: CLEAR_CHAT_SUCCESS });
  };
};

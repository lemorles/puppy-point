import axios from "axios";
import { URL_BASE } from "../config";

import {
  GET_ORDERS_BY_USER_PENDING,
  GET_ORDERS_BY_USER_REJECT,
  GET_ORDERS_BY_USER_SUCCESS,
  GET_ALL_ORDERS_PENDING,
  GET_ALL_ORDERS_REJECT,
  GET_ALL_ORDERS_SUCCESS,
  FILTER_ORDERS_PENDING,
  FILTER_ORDERS_SUCCESS,
  FILTER_ORDERS_REJECT,
} from "../types/orderTypes";

export const getOrderByUser = (id, query, order) => {
  const orderQuery = order ? `${!query ? "?" : "&"}order=${order}` : "";

  return async function (dispatch) {
    dispatch({ type: GET_ORDERS_BY_USER_PENDING });
    try {
      const json = await axios.get(
        `${URL_BASE}/order/user/${id}${query}${orderQuery}`
      );
      dispatch({ type: GET_ORDERS_BY_USER_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: GET_ORDERS_BY_USER_REJECT });
    }
  };
};

export const getAllOrders = () => {
  return async function (dispatch) {
    dispatch({ type: GET_ALL_ORDERS_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/order`);
      dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: GET_ALL_ORDERS_REJECT });
    }
  };
};

export const getOrderFilter = (payload) => {
  return async (dispatch) => {
    dispatch({ type: FILTER_ORDERS_PENDING });
    try {
      const json = await axios.get(
        `${URL_BASE}/order?fullName=${payload.fullName}&status=${payload.status}`
      );
      return dispatch({
        type: FILTER_ORDERS_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: FILTER_ORDERS_REJECT });
    }
  };
};

import axios from "axios";
import { URL_BASE } from "../config";
import {
  GET_ALL_USERS_BY_CHART_ROLE_PENDING,
  GET_ALL_USERS_BY_CHART_ROLE_REJECTED,
  GET_ALL_USERS_BY_CHART_ROLE_SUCCESS,
  GET_ALL_WALKS_BY_CHART_PENDING,
  GET_ALL_WALKS_BY_CHART_REJECT,
  GET_ALL_WALKS_BY_CHART_SUCCESS,
  GET_DOGS_FOR_CHART_PENDING,
  GET_DOGS_FOR_CHART_REJECT,
  GET_DOGS_FOR_CHART_SUCCESS,
} from "../types/chartTypes";

export function getDogsByChart(query) {
  return async function (dispatch) {
    dispatch({ type: GET_DOGS_FOR_CHART_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/dogs?${query}`);
      return dispatch({
        type: GET_DOGS_FOR_CHART_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_DOGS_FOR_CHART_REJECT });
    }
  };
}

export const getAllUsersByChartRole = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_USERS_BY_CHART_ROLE_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/users`);
      return dispatch({
        type: GET_ALL_USERS_BY_CHART_ROLE_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_ALL_USERS_BY_CHART_ROLE_REJECTED, payload: err });
    }
  };
};

export const getAllWalksByChart = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_WALKS_BY_CHART_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/walks`);
      return dispatch({
        type: GET_ALL_WALKS_BY_CHART_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_WALKS_BY_CHART_REJECT,
        payload: err,
      });
    }
  };
};

import axios from "axios";
import { URL_BASE } from "../config";
import {
  CREATE_RESERVE_PENDING,
  CREATE_RESERVE_REJECT,
  CREATE_RESERVE_SUCCESS,
  GET_ALL_RESERVES_PENDING,
  GET_ALL_RESERVES_REJECTED,
  GET_ALL_RESERVES_SUCCESS,
  GET_RESERVE_BY_ID_PENDING,
  GET_RESERVE_BY_ID_REJECT,
  GET_RESERVE_BY_ID_SUCCESS,
  DELETE_RESERVE_BY_ID_PENDING,
  DELETE_RESERVE_BY_ID_REJECT,
  DELETE_RESERVE_BY_ID_SUCCESS,
  UPDATE_RESERVE_PENDING,
  UPDATE_RESERVE_REJECT,
  UPDATE_RESERVE_SUCCESS,
  GET_ACCEPTED_RESERVES_WALKER_PENDING,
  GET_ACCEPTED_RESERVES_WALKER_REJECTED,
  GET_ACCEPTED_RESERVES_WALKER_SUCCESS,
  GET_PENDING_RESERVES_WALKER_PENDING,
  GET_PENDING_RESERVES_WALKER_REJECTED,
  GET_PENDING_RESERVES_WALKER_SUCCESS,
  GET_COMPLETED_RESERVES_WALKER_PENDING,
  GET_COMPLETED_RESERVES_WALKER_REJECTED,
  GET_COMPLETED_RESERVES_WALKER_SUCCESS,
  GET_PENDING_RESERVES_OWNER_PENDING,
  GET_PENDING_RESERVES_OWNER_REJECTED,
  GET_PENDING_RESERVES_OWNER_SUCCESS,
  GET_COMPLETED_RESERVES_OWNER_PENDING,
  GET_COMPLETED_RESERVES_OWNER_REJECTED,
  GET_COMPLETED_RESERVES_OWNER_SUCCESS,
  GET_ACCEPTED_RESERVES_OWNER_PENDING,
  GET_ACCEPTED_RESERVES_OWNER_REJECTED,
  GET_ACCEPTED_RESERVES_OWNER_SUCCESS,
  GET_ALL_RESERVES_FILTERS_PENDING,
  GET_ALL_RESERVES_FILTERS_REJECTED,
  GET_ALL_RESERVES_FILTERS_SUCCESS,
  GET_DOGS_RESERVES_PENDING,
  GET_DOGS_RESERVES_REJECTED,
  GET_DOGS_RESERVES_SUCCESS,
  PAY_RESERVES_PENDING,
  PAY_RESERVES_REJECT,
  PAY_RESERVES_SUCCESS,
  PAY_STATUS_PENDING,
  PAY_STATUS_REJECT,
  PAY_STATUS_SUCCESS,
  GET_ALL_RESERVES_FROM_USER_PENDING,
  GET_ALL_RESERVES_FROM_USER_SUCCESS,
  GET_ALL_RESERVES_FROM_USER_REJECTED,
} from "../types/reserveTypes";

export const createReserve = (input, history, path, addToast) => {
  return async function (dispatch) {
    dispatch({ type: CREATE_RESERVE_PENDING });
    try {
      const json = await axios.post(`${URL_BASE}/reserve/newreserve`, input);
      dispatch({ type: CREATE_RESERVE_SUCCESS, payload: json.data });
      history.push(path);
      addToast({
        title: "Éxito",
        description: "Reserva realizada",
        status: "success",
      });
    } catch (err) {
      dispatch({ type: CREATE_RESERVE_REJECT, payload: err.response });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

export const getAllReserves = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESERVES_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/reserve/`);
      return dispatch({ type: GET_ALL_RESERVES_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({ type: GET_ALL_RESERVES_REJECTED, payload: err });
    }
  };
};

export const getReserveById = (id) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESERVE_BY_ID_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/reserve/${id}`);
      return dispatch({
        type: GET_RESERVE_BY_ID_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_RESERVE_BY_ID_REJECT });
    }
  };
};

export const deleteReserveById = (payload) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_RESERVE_BY_ID_PENDING });
    try {
      const json = await axios.delete(
        `${URL_BASE}/reserve/${payload.id}/${payload.userId}`
      );
      dispatch({
        type: DELETE_RESERVE_BY_ID_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: DELETE_RESERVE_BY_ID_REJECT });
    }
  };
};

export const editReserve = (payload) => {
  return async function (dispatch) {
    dispatch({ type: UPDATE_RESERVE_PENDING });
    try {
      const json = await axios.put(
        `${URL_BASE}/reserve/status/${payload.id}`,
        payload
      );
      dispatch({ type: UPDATE_RESERVE_SUCCESS, payload: json.data });
    } catch (err) {
      dispatch({
        type: UPDATE_RESERVE_REJECT,
        payload: err.response.data,
      });
    }
  };
};

export const getAcceptedReservesWalker = (payload) => {
  return async (dispatch) => {
    dispatch({ type: GET_ACCEPTED_RESERVES_WALKER_PENDING });
    try {
      const json = await axios.get(`${URL_BASE}/reserve/walker/${payload}`);
      return dispatch({
        type: GET_ACCEPTED_RESERVES_WALKER_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_ACCEPTED_RESERVES_WALKER_REJECTED, payload: err });
    }
  };
};
//OJOOOOOOOOO
export const getPendingReservesWalker = (payload) => {
  return async (dispatch) => {
    dispatch({ type: GET_PENDING_RESERVES_WALKER_PENDING });
    try {
      const json = await axios.get(
        `${URL_BASE}/reserve/walker/accepted/${payload}`
      );
      return dispatch({
        type: GET_PENDING_RESERVES_WALKER_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_PENDING_RESERVES_WALKER_REJECTED, payload: err });
    }
  };
};

export const getCompletedReservesWalker = (payload) => {
  return async (dispatch) => {
    dispatch({ type: GET_COMPLETED_RESERVES_WALKER_PENDING });
    try {
      const json = await axios.get(
        `${URL_BASE}/reserve/walker/completed/${payload}`
      );
      return dispatch({
        type: GET_COMPLETED_RESERVES_WALKER_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_COMPLETED_RESERVES_WALKER_REJECTED, payload: err });
    }
  };
};

export const getPendingReservesOwner = (payload) => {
  return async (dispatch) => {
    dispatch({ type: GET_PENDING_RESERVES_OWNER_PENDING });
    try {
      const json = await axios.get(
        `${URL_BASE}/reserve/owner/pending/${payload}`
      );
      return dispatch({
        type: GET_PENDING_RESERVES_OWNER_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_PENDING_RESERVES_OWNER_REJECTED, payload: err });
    }
  };
};

export const getCompletedReservesOwner = (payload) => {
  return async (dispatch) => {
    dispatch({ type: GET_COMPLETED_RESERVES_OWNER_PENDING });
    try {
      const json = await axios.get(
        `${URL_BASE}/reserve/owner/completed/${payload}`
      );
      return dispatch({
        type: GET_COMPLETED_RESERVES_OWNER_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_COMPLETED_RESERVES_OWNER_REJECTED, payload: err });
    }
  };
};

export const getAcceptedReservesOwner = (payload) => {
  return async (dispatch) => {
    dispatch({ type: GET_ACCEPTED_RESERVES_OWNER_PENDING });
    try {
      const json = await axios.get(
        `${URL_BASE}/reserve/owner/accepted/${payload}`
      );
      return dispatch({
        type: GET_ACCEPTED_RESERVES_OWNER_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_ACCEPTED_RESERVES_OWNER_REJECTED, payload: err });
    }
  };
};

export const getSpecificReserveById = (payload) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESERVES_FILTERS_PENDING });
    try {
      const json = await axios.get(
        `${URL_BASE}/reserve/specificwalk, payload}`
      );
      return dispatch({
        type: GET_ALL_RESERVES_FILTERS_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_ALL_RESERVES_FILTERS_REJECTED });
    }
  };
};

export const getDoginReserve = (payload) => {
  const d = new Date(payload.date);
  let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  let month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

  const formattedDate = `${year}-${month}-${day}`;

  return async (dispatch) => {
    dispatch({ type: GET_DOGS_RESERVES_PENDING });
    try {
      const json = await axios.get(
        `${URL_BASE}/reserve/specificwalk/dogs/${formattedDate}/${payload.shift}/${payload.walkId}`
      );
      return dispatch({
        type: GET_DOGS_RESERVES_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_DOGS_RESERVES_REJECTED, payload: err });
    }
  };
};

export const payOrder = (payload /* , history */) => {
  return async function (dispatch) {
    dispatch({ type: PAY_RESERVES_PENDING });
    try {
      const json = await axios.post(`${URL_BASE}/order/mercadopago/`, payload);
      dispatch({ type: PAY_RESERVES_SUCCESS, payload: json.data });
      window.location.href = json.data.link;
    } catch (err) {
      dispatch({
        type: PAY_RESERVES_REJECT,
        payload: err.response,
      });
    }
  };
};

export const updateOrderStatus = (payload, history, path, addToast) => {
  return async function (dispatch) {
    dispatch({ type: PAY_STATUS_PENDING });
    try {
      const json = await axios.put(`${URL_BASE}/order`, payload);
      dispatch({ type: PAY_STATUS_SUCCESS, payload: json.data });
      history.push(path);
      addToast({
        title: json.data.title,
        description: json.data.msg,
        status: json.data.status,
      });
    } catch (err) {
      dispatch({
        type: PAY_STATUS_REJECT,
        payload: err.response,
      });
      addToast({
        title: "Error",
        description: err.response.data.msg,
        status: "error",
      });
    }
  };
};

export const getAllReservesFromOwnerAccepted = (payload) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESERVES_FROM_USER_PENDING });
    try {
      const json = await axios.get(
        `${URL_BASE}/reserve/owner/accepted/${payload}`
      );
      return dispatch({
        type: GET_ALL_RESERVES_FROM_USER_SUCCESS,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: GET_ALL_RESERVES_FROM_USER_REJECTED, payload: err });
    }
  };
};

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

const initialState = {
  isLoading: false,
  error: null,
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_BY_USER_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_ORDERS_BY_USER_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        orders: [],
      };
    case GET_ORDERS_BY_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
      };
    case GET_ALL_ORDERS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_ALL_ORDERS_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        orders: [],
      };
    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
      };
    case FILTER_ORDERS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case FILTER_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
      };
    case FILTER_ORDERS_REJECT:
      return {
        ...state,
        isLoading: false,
        orders: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;

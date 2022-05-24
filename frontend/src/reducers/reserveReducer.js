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

const initialState = {
  isLoading: false,
  error: null,
  reserves: [],
  dogsCounter: 0,
  reserve: null,
  reservesCompleted: [],
  reservesAccepted: [],
  reservesPending: [],
  allReserves: [],
  orderPayment: "",
  orderId: null,
  msg: "",
};

const reserveReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RESERVE_PENDING:
      return {
        ...state,
        error: null,
        reserve: null,
        isLoading: true,
      };
    case CREATE_RESERVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        dogsCounter: 0,
      };
    case CREATE_RESERVE_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        dogsCounter: 0,
      };
    case GET_ALL_RESERVES_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case GET_ALL_RESERVES_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_ALL_RESERVES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reserves: action.payload,
      };

    case GET_RESERVE_BY_ID_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
        reserve: null,
      };
    case GET_RESERVE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reserve: action.payload,
      };
    case GET_RESERVE_BY_ID_REJECT:
      return {
        ...state,
        isLoading: false,
        reserve: null,
        error: action.payload,
      };

    case DELETE_RESERVE_BY_ID_PENDING:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DELETE_RESERVE_BY_ID_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DELETE_RESERVE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reservesPending: action.payload,
      };

    case UPDATE_RESERVE_PENDING:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_RESERVE_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_RESERVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case GET_PENDING_RESERVES_WALKER_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case GET_PENDING_RESERVES_WALKER_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        reservesPending: [],
      };
    case GET_PENDING_RESERVES_WALKER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reservesPending: action.payload,
      };

    case GET_ACCEPTED_RESERVES_WALKER_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case GET_ACCEPTED_RESERVES_WALKER_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        reservesAccepted: [],
      };
    case GET_ACCEPTED_RESERVES_WALKER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reservesAccepted: action.payload,
      };

    case GET_PENDING_RESERVES_OWNER_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case GET_PENDING_RESERVES_OWNER_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_PENDING_RESERVES_OWNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reservesPending: action.payload,
      };
    case GET_COMPLETED_RESERVES_OWNER_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case GET_COMPLETED_RESERVES_OWNER_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_COMPLETED_RESERVES_OWNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reservesCompleted: action.payload,
      };

    case GET_COMPLETED_RESERVES_WALKER_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case GET_COMPLETED_RESERVES_WALKER_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_COMPLETED_RESERVES_WALKER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reservesCompleted: action.payload,
      };

    case GET_ACCEPTED_RESERVES_OWNER_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case GET_ACCEPTED_RESERVES_OWNER_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_ACCEPTED_RESERVES_OWNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reservesCompleted: action.payload,
      };

    case GET_ALL_RESERVES_FILTERS_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
        reserve: null,
      };
    case GET_ALL_RESERVES_FILTERS_REJECTED:
      return {
        ...state,
        isLoading: false,
        reserve: action.payload,
      };
    case GET_ALL_RESERVES_FILTERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reserve: null,
        error: action.payload,
      };

    case GET_DOGS_RESERVES_PENDING:
      return { ...state };
    case GET_DOGS_RESERVES_REJECTED:
      return { ...state, dogsCounter: 0 };
    case GET_DOGS_RESERVES_SUCCESS:
      return { ...state, dogsCounter: action.payload };

    case PAY_RESERVES_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case PAY_RESERVES_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case PAY_RESERVES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderPayment: action.payload.link,
        orderId: action.payload.orderId,
      };

    case PAY_STATUS_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
        orderPayment: "",
      };
    case PAY_STATUS_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        orderPayment: "",
      };
    case PAY_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderPayment: "",
        msg: action.payload,
        reservesPending: [],
      };

    case GET_ALL_RESERVES_FROM_USER_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case GET_ALL_RESERVES_FROM_USER_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        allReserves: [],
      };
    case GET_ALL_RESERVES_FROM_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderPayment: "",
        allReserves: action.payload,
      };

    default:
      return state;
  }
};

export default reserveReducer;

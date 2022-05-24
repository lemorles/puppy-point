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

const initialState = {
  isLoading: false,
  error: null,
  notifications: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notifications: action.payload,
      };
    case GET_NOTIFICATIONS_REJECT:
      return {
        ...state,
        isLoading: false,
      };

    case CREATE_NOTIFICATION_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case CREATE_NOTIFICATION_REJECT:
      return {
        ...state,
        isLoading: false,
      };

    case CHANGE_STATUS_NOTIFICATION_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case CHANGE_STATUS_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case CHANGE_STATUS_NOTIFICATION_REJECT:
      return {
        ...state,
        isLoading: false,
      };

    case DELETE_NOTIFICATION_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case DELETE_NOTIFICATION_REJECT:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default notificationReducer;

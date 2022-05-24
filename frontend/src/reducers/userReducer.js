import {
  CREATE_USER_PENDING,
  CREATE_USER_REJECT,
  CREATE_USER_SUCCESS,
  SELECT_OPTION_REGISTER,
  EDIT_USER_PENDING,
  EDIT_USER_REJECT,
  EDIT_USER_SUCCESS,
  GET_USER_BY_ID_PENDING,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_REJECT,
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_REJECT,
  LOGOUT_USER,
  SAVE_TOKEN_IN_LOCAL_STORAGE,
  LOGIN_WITH_GOOGLE_PENDING,
  LOGIN_WITH_GOOGLE_SUCCESS,
  LOGIN_WITH_GOOGLE_REJECT,
  PASSWORD_EDIT_PENDING,
  PASSWORD_EDIT_REJECT,
  PASSWORD_EDIT_SUCCESS,
  GET_ALL_USERS_PENDING,
  GET_ALL_USERS_REJECTED,
  GET_ALL_USERS_SUCCESS,
  ROL_EDIT_PENDING,
  ROL_EDIT_SUCCESS,
  ROL_EDIT_REJECT,
  SEARCH_USER_BY_NAME_PENDING,
  SEARCH_USER_BY_NAME_REJECT,
  SEARCH_USER_BY_NAME_SUCCESS,
  STATUS_EDIT_PENDING,
  STATUS_EDIT_SUCCESS,
  STATUS_EDIT_REJECT,
  FORCE_PASSWORD_PENDING,
  FORCE_PASSWORD_SUCCESS,
  FORCE_PASSWORD_REJECT,
  userTypes,
} from "../types/userTypes";

const initialState = {
  isLoading: false,
  error: null,
  user: null,
  option: null,
  token: null,
  allUsers: [],
  msgOK: null,
  link: null,
  userReview: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_PENDING:
      return {
        ...state,
        error: null,
        token: null,
        user: null,
        isLoading: true,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload.user,
        token: action.payload.token,
      };
    case CREATE_USER_REJECT:
      return {
        ...state,
        isLoading: false,
        token: null,
        user: null,
        error: action.payload,
      };
    case SELECT_OPTION_REGISTER:
      return {
        ...state,
        option: action.payload,
      };
    case EDIT_USER_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload.user,
        token: action.payload.token,
      };
    case EDIT_USER_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_ALL_USERS_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case GET_ALL_USERS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allUsers: action.payload,
        error: null,
      };
    case GET_USER_BY_ID_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userReview: action.payload,
        error: null,
      };
    case GET_USER_BY_ID_REJECT:
      return {
        ...state,
        isLoading: false,
        user: null,
        error: action.payload,
      };
    case LOGIN_USER_PENDING:
      return {
        ...state,
        token: null,
        user: null,
        error: null,
        isLoading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGIN_USER_REJECT:
      return {
        ...state,
        isLoading: false,
        token: null,
        user: null,
        error: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoading: false,
        user: null,
        token: null,
        error: null,
      };
    case LOGIN_WITH_GOOGLE_PENDING:
      return {
        ...state,
        isLoading: true,
        token: null,
        user: null,
      };
    case LOGIN_WITH_GOOGLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case LOGIN_WITH_GOOGLE_REJECT:
      return {
        ...state,
        isLoading: false,
        token: null,
        user: null,
      };
    case SAVE_TOKEN_IN_LOCAL_STORAGE:
      return {
        ...state,
        token: action.payload,
      };

    case PASSWORD_EDIT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case PASSWORD_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case PASSWORD_EDIT_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ROL_EDIT_PENDING:
      return {
        ...state,
        isLoading: true,
        msgOK: null,
      };
    case ROL_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        msgOK: action.payload,
      };
    case ROL_EDIT_REJECT:
      return {
        isLoading: false,
        error: action.payload,
        msgOK: null,
      };
    case SEARCH_USER_BY_NAME_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case SEARCH_USER_BY_NAME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allUsers: action.payload,
        error: null,
      };
    case SEARCH_USER_BY_NAME_REJECT:
      return {
        ...state,
        isLoading: false,
        allUsers: null,
        error: action.payload,
      };
    case userTypes.FORGOT_PASSWORD_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
        link: null,
      };
    case userTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        link: action.payload,
      };
    case userTypes.FORGOT_PASSWORD_REJECT:
      return {
        ...state,
        isLoading: false,
        link: null,
        error: action.payload,
      };

    case FORCE_PASSWORD_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FORCE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case FORCE_PASSWORD_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case userTypes.RESET_PASSWORD_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case userTypes.RESET_PASSWORD_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case STATUS_EDIT_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case STATUS_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case STATUS_EDIT_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;

import {
  GET_WALK_TO_WALKER,
  GET_WALK_BY_ID_PENDING,
  GET_WALK_BY_ID_SUCCESS,
  GET_WALK_BY_ID_REJECT,
  GET_WALKS_SUCCESS,
  GET_WALKS_REJECT,
  GET_WALKS_PENDING,
  GET_MYWALKS_PENDING,
  GET_MYWALKS_SUCCESS,
  GET_MYWALKS_REJECT,
  /*   EDIT_WALKS_PENDING,
  EDIT_WALKS_REJECT,
  EDIT_WALKS_SUCCESS, */
  walkTypes,
  DELETE_WALKS_BY_ID_PENDING,
  DELETE_WALKS_BY_ID_REJECT,
  DELETE_WALKS_BY_ID_SUCCESS,
  INACTIVE_WALK_BY_ID_PENDING,
  INACTIVE_WALK_BY_ID_SUCCESS,
  INACTIVE_WALK_BY_ID_REJECT,
} from "../types/walkTypes";

const initialState = {
  isLoading: false,
  error: null,
  walker: [],
  walks: [],
  walk: null,
};

const walkReducer = (state = initialState, action) => {
  switch (action.type) {
    case walkTypes.CREATE_NEW_WALK_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case walkTypes.CREATE_NEW_WALK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case walkTypes.CREATE_NEW_WALK_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_WALK_TO_WALKER:
      return {
        ...state,
        walker: action.payload,
      };
    case GET_WALK_BY_ID_PENDING:
      return {
        ...state,
        error: null,
        walk: null,
        isLoading: true,
      };
    case GET_WALK_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        walk: action.payload,
        error: null,
      };
    case GET_WALK_BY_ID_REJECT:
      return {
        ...state,
        isLoading: false,
        walk: null,
        error: action.payload,
      };
    case GET_WALKS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
        walks: [],
      };
    case GET_WALKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        walks: action.payload.walks,
        walksRecommended: action.payload.walksRecommended,
      };
    case GET_WALKS_REJECT:
      return {
        ...state,
        isLoading: false,
        walks: [],
        error: action.payload,
      };

    case GET_MYWALKS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
        walks: [],
      };
    case GET_MYWALKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        walks: action.payload,
      };
    case GET_MYWALKS_REJECT:
      return {
        ...state,
        isLoading: false,
        walks: [],
        error: action.payload,
      };

    case DELETE_WALKS_BY_ID_PENDING:
      return {
        ...state,
        isLoading: true,
        walks: [],
        walk: null,
      };
    case DELETE_WALKS_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        walk: null,
      };
    case DELETE_WALKS_BY_ID_REJECT:
      return {
        ...state,
        isLoading: false,
        walks: [],
        error: action.payload,
      };

    case INACTIVE_WALK_BY_ID_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case INACTIVE_WALK_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        walk: null,
      };
    case INACTIVE_WALK_BY_ID_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default walkReducer;

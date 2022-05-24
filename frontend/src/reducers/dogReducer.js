import {
  CREATE_DOG_PENDING,
  CREATE_DOG_SUCCESS,
  CREATE_DOG_REJECT,
  GET_DOGS_PENDING,
  GET_DOGS_SUCCESS,
  GET_DOGS_REJECT,
  GET_DOG_BY_ID_PENDING,
  GET_DOG_BY_ID_SUCCESS,
  GET_DOG_BY_ID_REJECT,
  DELETE_DOG_BY_ID_PENDING,
  DELETE_DOG_BY_ID_REJECT,
  DELETE_DOG_BY_ID_SUCCESS,
  EDIT_DOG_PENDING,
  EDIT_DOG_REJECT,
  EDIT_DOG_SUCCESS,
  GET_DOGS_BY_USER_PENDING,
  GET_DOGS_BY_USER_SUCCESS,
  GET_DOGS_BY_USER_REJECT,
  GET_BREEDS_PENDING,
  GET_BREEDS_SUCCESS,
  GET_BREEDS_REJECT,
  FILTER_DOGS_PENDING,
  FILTER_DOGS_SUCCESS,
  FILTER_DOGS_REJECT,
} from "../types/dogTypes";

const initialState = {
  isLoading: false,
  error: null,
  dogs: [],
  dog: null,
  breeds: [],
};

const dogReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DOG_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_DOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dog: action.payload,
      };
    case CREATE_DOG_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        dogs: [],
        dog: null,
      };
    case GET_DOGS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DOGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dogs: action.payload,
      };
    case GET_DOGS_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        dogs: [],
        dog: null,
      };

    case GET_DOG_BY_ID_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DOG_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dog: action.payload,
      };
    case GET_DOG_BY_ID_REJECT:
      return {
        ...state,
        isLoading: false,
        dog: null,
      };
    case DELETE_DOG_BY_ID_PENDING:
      return {
        ...state,
        isLoading: true,
        dog: null,
      };
    case DELETE_DOG_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dog: action.payload,
      };
    case DELETE_DOG_BY_ID_REJECT:
      return {
        ...state,
        isLoading: false,
        dog: null,
      };

    case EDIT_DOG_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case EDIT_DOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dog: action.payload,
      };

    case EDIT_DOG_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        dog: null,
      };
    case GET_DOGS_BY_USER_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DOGS_BY_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dogs: action.payload,
      };
    case GET_DOGS_BY_USER_REJECT:
      return {
        ...state,
        isLoading: false,
        dog: null,
        dogs: [],
        error: action.payload,
      };
    case GET_BREEDS_PENDING:
      return {
        ...state,
        isLoading: true,
        breeds: [],
      };
    case GET_BREEDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        breeds: action.payload,
      };
    case GET_BREEDS_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case FILTER_DOGS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case FILTER_DOGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dogs: action.payload,
      };
    case FILTER_DOGS_REJECT:
      return {
        ...state,
        isLoading: false,
        dogs: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default dogReducer;

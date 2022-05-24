import {
  GET_POST_PENDING,
  GET_POST_SUCCESS,
  GET_POST_REJECT,
  DETAIL_POST_PENDING,
  DETAIL_POST_SUCCESS,
  DETAIL_POST_REJECT,
  CREATE_POST_PENDING,
  CREATE_POST_SUCCESS,
  CREATE_POST_REJECT,
  DELETE_POST_PENDING,
  DELETE_POST_SUCCESS,
  DELETE_POST_REJECT,
  EDIT_POST_PENDING,
  EDIT_POST_SUCCESS,
  EDIT_POST_REJECT,
  GET_POSTCOMMENTS_PENDING,
  GET_POSTCOMMENTS_SUCCESS,
  GET_POSTCOMMENTS_REJECT,
  CREATE_POSTCOMMENTS_PENDING,
  CREATE_POSTCOMMENTS_SUCCESS,
  CREATE_POSTCOMMENTS_REJECT,
  EDIT_POSTCOMMENTS_PENDING,
  EDIT_POSTCOMMENTS_SUCCESS,
  EDIT_POSTCOMMENTS_REJECT,
  DELETE_POSTCOMMENTS_PENDING,
  DELETE_POSTCOMMENTS_SUCCESS,
  DELETE_POSTCOMMENTS_REJECT,
  SEARCH_BY_TITLE_POSTS_PENDING,
  SEARCH_BY_TITLE_POSTS_SUCCESS,
  SEARCH_BY_TITLE_POSTS_REJECT,
  FILTER_BY_CATEGORY_POSTS_PENDING,
  FILTER_BY_CATEGORY_POSTS_SUCCESS,
  FILTER_BY_CATEGORY_POSTS_REJECT,
} from "../types/postTypes";

const initialState = {
  isLoading: false,
  error: null,
  post: {},
  posts: [],
  comments: [],
  comment: {},
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET_POST_SUCCESS:
    //   return {
    //     ...state,
    //     posts: action.payload,
    //   };
    case GET_POST_PENDING:
      return {
        ...state,
        isLoading: true,
        posts: [],
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
      };
    case GET_POST_REJECT:
      return {
        ...state,
        isLoading: false,
        posts: [],
        error: action.payload,
      };
    case DETAIL_POST_PENDING:
      return {
        ...state,
        isLoading: true,
        post: {},
      };
    case DETAIL_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: action.payload,
      };
    case DETAIL_POST_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        post: {},
      };
    case CREATE_POST_PENDING:
      return {
        ...state,
        isLoading: true,
        post: {},
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: action.payload,
      };
    case CREATE_POST_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        post: {},
      };
    case DELETE_POST_PENDING:
      return {
        ...state,
        isLoading: true,
        post: {},
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: action.payload,
      };
    case DELETE_POST_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        post: {},
      };
    case EDIT_POST_PENDING:
      return {
        ...state,
        isLoading: true,
        post: {},
      };
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: action.payload,
      };
    case EDIT_POST_REJECT:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        post: {},
      };
    case GET_POSTCOMMENTS_PENDING:
      return {
        ...state,
        isLoading: true,
        // comments: [],
      };
    case GET_POSTCOMMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: action.payload,
      };
    case GET_POSTCOMMENTS_REJECT:
      return {
        ...state,
        isLoading: false,
        comments: [],
        error: action.payload,
      };
    case CREATE_POSTCOMMENTS_PENDING:
      return {
        ...state,
        isLoading: true,
        comment: {},
      };
    case CREATE_POSTCOMMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comment: action.payload,
      };
    case CREATE_POSTCOMMENTS_REJECT:
      return {
        ...state,
        isLoading: false,
        comment: {},
        error: action.payload,
      };
    case EDIT_POSTCOMMENTS_PENDING:
      return {
        ...state,
        isLoading: true,
        comment: {},
      };
    case EDIT_POSTCOMMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comment: action.payload,
      };
    case EDIT_POSTCOMMENTS_REJECT:
      return {
        ...state,
        isLoading: false,
        comment: {},
        error: action.payload,
      };
    case DELETE_POSTCOMMENTS_PENDING:
      return {
        ...state,
        isLoading: true,
        comment: {},
      };
    case DELETE_POSTCOMMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comment: action.payload,
      };
    case DELETE_POSTCOMMENTS_REJECT:
      return {
        ...state,
        isLoading: false,
        comment: {},
        error: action.payload,
      };
    case SEARCH_BY_TITLE_POSTS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_BY_TITLE_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
      };
    case SEARCH_BY_TITLE_POSTS_REJECT:
      return {
        ...state,
        isLoading: false,
        posts: [],
        error: action.payload,
      };
    case FILTER_BY_CATEGORY_POSTS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case FILTER_BY_CATEGORY_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
      };
    case FILTER_BY_CATEGORY_POSTS_REJECT:
      return {
        ...state,
        isLoading: false,
        posts: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;

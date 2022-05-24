import {
  GET_MESSAGES_PENDING,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_REJECT,
  CREATE_MESSAGE_PENDING,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_REJECT,
  CLEAR_CHAT_SUCCESS,
} from "../types/chatTypes";

const initialState = {
  isLoading: false,
  error: null,
  chats: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_PENDING:
      return {
        ...state,
        isLoading: true,
        chats: [],
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        chats: action.payload,
      };
    case GET_MESSAGES_REJECT:
      return {
        ...state,
        isLoading: false,
        chats: [],
      };

    case CLEAR_CHAT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        chats: [],
      };

    case CREATE_MESSAGE_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case CREATE_MESSAGE_REJECT:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default chatReducer;

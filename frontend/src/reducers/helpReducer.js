import {
    GET_HELPS_PENDING,
    GET_HELPS_SUCCESS,
    GET_HELPS_REJECT,
    DETAIL_HELP_PENDING,
    DETAIL_HELP_SUCCESS,
    DETAIL_HELP_REJECT,
    CREATE_HELP_PENDING,
    CREATE_HELP_SUCCESS,
    CREATE_HELP_REJECT,
    DELETE_HELP_PENDING,
    DELETE_HELP_SUCCESS,
    DELETE_HELP_REJECT,
} from "../types/helpTypes";

const initialState = {
    isLoading: false,
    error: null,
    help: {},
    helps:[],
};

const helpReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HELPS_PENDING:
            return {
                ...state,
                isLoading: true,
                helps: [],
            };
        case GET_HELPS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                helps: action.payload,
            };
        case GET_HELPS_REJECT:
            return {
                ...state,
                isLoading: false,
                helps: [],
                error: action.payload,
            };
        case DETAIL_HELP_PENDING:
            return {
                ...state,
                isLoading: true,
                help: {},
            };
        case DETAIL_HELP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                help: action.payload,
            };
        case DETAIL_HELP_REJECT:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                help: {},
            };
        case CREATE_HELP_PENDING:
            return {
                ...state,
                isLoading: true,
                help: {},
            };
        case CREATE_HELP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                help: action.payload,
            };
        case CREATE_HELP_REJECT:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                help: {},
            };
        case DELETE_HELP_PENDING:
            return {
                ...state,
                isLoading: true,
                help: {},
            };
        case DELETE_HELP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                help: action.payload,
            };
        case DELETE_HELP_REJECT:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                help: {},
            };
        default:
            return state;
    }
};

export default helpReducer;
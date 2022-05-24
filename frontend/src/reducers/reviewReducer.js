import { 
    GET_WALKER_REVIEW_PENDING,
    GET_WALKER_REVIEW_SUCCESS,
    GET_WALKER_REVIEW_REJECT,
    CREATE_WALKER_REVIEW_PENDING,
    CREATE_WALKER_REVIEW_SUCCESS,
    CREATE_WALKER_REVIEW_REJECT,
    EDIT_WALKER_REVIEW_PENDING,
    EDIT_WALKER_REVIEW_SUCCESS,
    EDIT_WALKER_REVIEW_REJECT,
    DELETE_WALKER_REVIEW_PENDING,
    DELETE_WALKER_REVIEW_SUCCESS,
    DELETE_WALKER_REVIEW_REJECT,
} from "../types/reviewTypes";

const initialState = {
    isLoading: false,
    error: null,
    review: {},
    reviews: [],
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WALKER_REVIEW_PENDING:
            return {
                ...state,
                isLoading: true,
                error: null,
                reviews: [],
            };
        case GET_WALKER_REVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                reviews: action.payload,

            };
        case GET_WALKER_REVIEW_REJECT:
            return {
                ...state,
                isLoading: false,
                reviews: [],
                error: action.payload,
            };
        case CREATE_WALKER_REVIEW_PENDING:
            return {
                ...state,
                isLoading: true,
                review: {},
            };
        case CREATE_WALKER_REVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                review: action.payload,
            };
        case CREATE_WALKER_REVIEW_REJECT:
            return {
                ...state,
                isLoading: false,
                review: {},
                error: action.payload,
            };
        case EDIT_WALKER_REVIEW_PENDING:
            return {
                ...state,
                isLoading: true,
                review: {},
            };
        case EDIT_WALKER_REVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                review: action.payload,
            };
        case EDIT_WALKER_REVIEW_REJECT:
            return {
                ...state,
                isLoading: false,
                review: {},
                error: action.payload,
            };
        case DELETE_WALKER_REVIEW_PENDING:
            return {
                ...state,
                isLoading: true,
                review: {},
            };
        case DELETE_WALKER_REVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                review: action.payload,
            };
        case DELETE_WALKER_REVIEW_REJECT:
            return {
                ...state,
                isLoading: false,
                review: {},
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reviewReducer;
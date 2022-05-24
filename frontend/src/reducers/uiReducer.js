import { TOOGLE_DRAWER_CART } from "../types/uiTypes";

const initialState = {
  isOpenDrawer: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOOGLE_DRAWER_CART:
      return {
        ...state,
        isOpenDrawer: !state.isOpenDrawer,
      };
    default:
      return {
        ...state,
      };
  }
};

export default uiReducer;

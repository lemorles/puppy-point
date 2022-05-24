import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reserveReducer from "./reducers/reserveReducer";
import userReducer from "./reducers/userReducer";
import walkReducer from "./reducers/walkReducer";
import dogReducer from "./reducers/dogReducer";
import postReducer from "./reducers/postReducer";
import locationReducer from "./reducers/locationReducer";
import uiReducer from "./reducers/uiReducer";
import orderReducer from "./reducers/orderReducer";
import reviewReducer from "./reducers/reviewReducer";
import notificationReducer from "./reducers/notificationReducer";
import { saveStore, getStore } from "./utils/persistStore";
import chatReducer from "./reducers/chatReducer";
import helpReducer from "./reducers/helpReducer";
import chartReducer from "./reducers/chartReducer";

const rootReducer = combineReducers({
  user: userReducer,
  walk: walkReducer,
  reserve: reserveReducer,
  dog: dogReducer,
  post: postReducer,
  location: locationReducer,
  ui: uiReducer,
  order: orderReducer,
  review: reviewReducer,
  notification: notificationReducer,
  chat: chatReducer,
  help: helpReducer,
  chart: chartReducer,
});

const persistedStore = getStore();

export const store = createStore(
  rootReducer,
  persistedStore,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveStore(store.getState());
});

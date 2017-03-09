import ExEnv from "exenv";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);


export const configureStore = (initialState) => {
  if (process.env.NODE_ENV !== "production" && ExEnv.canUseDOM) {
    return createStoreWithMiddleware(
      rootReducer,
      initialState,
      window.devToolsExtension ? window.devToolsExtension() : (f) => f
    );
  }
  return createStoreWithMiddleware(rootReducer, initialState);
};

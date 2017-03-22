import {combineReducers} from "redux";

const planoutExperiment = (store, action) => {
  if (action.type === "RECEIVE_EXPERIMENT") {
    return action.json;
  }
  return store || [];
}

const checkBox = (store, action) => {
  if (action.type === "TOGGLE_CHECK") {
    return {
      checked: !store.checked
    };
  }

  return store || {checked: false};
};

const number = (store, action) => {
  if (action.type === "INC_NUMBER") {
    return {
      value: store.value + 1
    };
  } else if (action.type === "DEC_NUMBER") {
    return {
      value: store.value - 1
    };
  }

  return store || {value: 0};
};

const optimizelyExperiment = (store, action) => {
  return store || {};
};

const user = (store, action) => store || {};

export default combineReducers({
  checkBox,
  number,
  planoutExperiment,
  optimizelyExperiment,
  user
});

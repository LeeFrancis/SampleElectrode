import {combineReducers} from "redux";

const experiments = (store, action) => {
  console.log(JSON.stringify(action));
  if (action.type === "RECEIVE_EXPERIMENT") {
    console.log("BAM! DONE!");
    return {
      experiment: action.json
    }
  }
  return store || {experiment: {}};
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

export default combineReducers({
  checkBox,
  number,
  experiments  
});

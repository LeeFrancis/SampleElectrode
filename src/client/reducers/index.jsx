import {combineReducers} from "redux";

const experiments = (store, action) => {
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

const search = (state = [], action) => {
  if (action.type === "DO_SEARCH") {
    const dv = Math.random();
    console.log(dv);
    return Object.assign({}, state, { searchTerm: dv });
  }
  return state;
};

export default combineReducers({
  checkBox,
  number,
  experiments,
  search  
});

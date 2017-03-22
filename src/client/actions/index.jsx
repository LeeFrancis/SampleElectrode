import fetch from "isomorphic-fetch";

export const fetchExperiments = () => {
  return (dispatch) => {
    return fetch("http://0.0.0.0:4000/api/Experiments")
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then((json) => dispatch(receiveExperiment(json)));
  };
};

export const receiveExperiment = (json) => {
  return {
    type: "RECEIVE_EXPERIMENT",
    json
  };
};

export const storeUser = (data) => {
  return {
    type: "STORE_USER",
    data: data
  };
};

export const toggleCheck = () => {
  return {
    type: "TOGGLE_CHECK"
  };
};

export const incNumber = () => {
  return {
    type: "INC_NUMBER"
  };
};

export const decNumber = () => {
  return {
    type: "DEC_NUMBER"
  };
};

export const doSearch = (data) => {
  console.log("doSearch ", data);
  return {
    type: "DO_SEARCH",
    data
  }
}

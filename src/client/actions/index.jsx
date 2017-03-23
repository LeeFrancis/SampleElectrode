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

export const storeUser = (data) => {
  return {
    type: "STORE_USER",
    data: data
  };
};

export const doSearch = (data) => {
  console.log("doSearch ", data);
  return {
    type: "DO_SEARCH",
    data
  };
};

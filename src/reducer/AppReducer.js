const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "SET_ORDERS":
      return {
        ...state,
        loading: false,
        error: "",
        orders: Array.isArray(action.payload) ? action.payload : [],
      };

    case "SET_FILTER_TEXT":
      return {
        ...state,
        filterText: action.payload,
      };

    default:
      return state;
  }
};

export default AppReducer;
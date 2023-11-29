const initialState = {
  categories: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORIES_SUCCESS":
      return {
        ...state,
        categories: action.payload,
      };
    case "GET_CATEGORIES_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;

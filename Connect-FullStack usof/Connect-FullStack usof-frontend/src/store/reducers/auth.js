const initialState = {
  user: null,
  isAuth: false,
  loading: false,
  message: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_AUTH_STATUS":
      return { ...state, isAuth: action.payload };
    case "SET_LOADING_STATUS":
      return { ...state, loading: action.payload };
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    case "CLEAR_MESSAGE":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default authReducer;

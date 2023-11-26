const initialState = {
  user: null,
  isAuth: false,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_AUTH_STATUS":
      return { ...state, isAuth: action.payload };
    case "SET_LOADING_STATUS":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default authReducer;

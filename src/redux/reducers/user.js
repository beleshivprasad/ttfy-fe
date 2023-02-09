import { SAVE_ACCESS_TOKEN, REMOVE_ACCESS_TOKEN } from "../actions/actionTypes";

const initialState = {
  accessToken: localStorage.getItem("accessToken") || "",
  isLoggedIn: Boolean(localStorage.getItem("accessToken")),
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ACCESS_TOKEN:
      return { ...state, accessToken: action.accessToken, isLoggedIn: true };
    case REMOVE_ACCESS_TOKEN:
      return { ...state, accessToken: "", isLoggedIn: false };
    default:
      return state;
  }
};

export default userReducer;

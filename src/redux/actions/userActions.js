import {
  LOGIN_USER,
  REGISTER_UESR,
  LOGOUT_USER,
  SAVE_ACCESS_TOKEN,
  REMOVE_ACCESS_TOKEN,
} from "./actionTypes";

export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const registerUser = (user) => {
  return {
    type: REGISTER_UESR,
    user,
  };
};

export const saveAccessToken = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
  return {
    type: SAVE_ACCESS_TOKEN,
    accessToken,
  };
};

export const removeAccessToken = (accessToken) => {
  localStorage.removeItem("accessToken");
  return {
    type: REMOVE_ACCESS_TOKEN,
  };
};

import { SHOW_FLASH_MESSAGE, HIDE_FLASH_MESSAGE } from "../actions/actionTypes";

const initialState = {
  message: "",
  messageType: "",
  showMessage: false,
  errors: [],
  hideAfter: 3000,
};

const flashReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FLASH_MESSAGE:
      return {
        ...state,
        message: action.message,
        messageType: action.messageType,
        showMessage: true,
        errors: action.errors,
      };
    case HIDE_FLASH_MESSAGE:
      return { ...initialState };
    default:
      return state;
  }
};

export default flashReducer;

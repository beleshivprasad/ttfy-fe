import { HIDE_FLASH_MESSAGE, SHOW_FLASH_MESSAGE } from "./actionTypes";

export const showFlashMessage = (data) => {
  return {
    type: SHOW_FLASH_MESSAGE,
    message: data.message,
    messageType: data.messageType,
    errors: data.errors,
  };
};

export const hideFlashMessage = () => {
  return {
    type: HIDE_FLASH_MESSAGE,
  };
};

import { combineReducers } from "redux";
import flash from "./flash";
import user from "./user";

export const rootReducer = combineReducers({
  user,
  flash,
});

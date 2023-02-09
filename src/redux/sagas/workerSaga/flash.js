import { put, all } from "redux-saga/effects";
import { hideFlashMessage } from "../../actions/flashActions";
import { removeAccessToken } from "../../actions/userActions";

export function* logoutWorkerSaga() {
  yield all([put(removeAccessToken()), put(hideFlashMessage())]);
}

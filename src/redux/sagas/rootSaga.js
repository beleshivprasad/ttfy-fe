import { all, takeEvery } from "redux-saga/effects";
import { REGISTER_UESR, LOGIN_USER, LOGOUT_USER } from "../actions/actionTypes";
import {
  loginWorkerSaga,
  logoutWorkerSaga,
  registerWorkerSaga,
} from "./workerSaga/user";

function* watcherSaga() {
  yield all([
    takeEvery(LOGIN_USER, loginWorkerSaga),
    takeEvery(REGISTER_UESR, registerWorkerSaga),
    takeEvery(LOGOUT_USER, logoutWorkerSaga),
  ]);
}

export default watcherSaga;

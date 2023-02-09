import { all, takeEvery } from "redux-saga/effects";
import { REGISTER_UESR, LOGIN_USER, LOGOUT_USER } from "../actions/actionTypes";
import { loginWorkerSaga, registerWorkerSaga } from "./workerSaga/user";
import { logoutWorkerSaga } from "./workerSaga/flash";

function* watcherSaga() {
  yield all([
    takeEvery(LOGIN_USER, loginWorkerSaga),
    takeEvery(REGISTER_UESR, registerWorkerSaga),
    takeEvery(LOGOUT_USER, logoutWorkerSaga),
  ]);
}

export default watcherSaga;

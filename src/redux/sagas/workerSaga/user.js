import { all, call, put } from "redux-saga/effects";
import { userLoginRequest, userRegisterRequest } from "../requestHandlers/user";
import { saveAccessToken, removeAccessToken } from "../../actions/userActions";
import { showFlashMessage, hideFlashMessage } from "../../actions/flashActions";

export function* loginWorkerSaga(action) {
  const { user } = action;
  const response = yield call(userLoginRequest, user);

  if (response.success) {
    yield all([put(saveAccessToken(response.data.token))]);
  } else {
    yield put(
      showFlashMessage({
        message: response.message,
        messageType: "error",
        errors: response.errors,
      })
    );
  }
}

export function* logoutWorkerSaga() {
  yield all([put(removeAccessToken()), put(hideFlashMessage())]);
}

export function* registerWorkerSaga(action) {
  const { user } = action;
  const response = yield call(userRegisterRequest, user);

  if (response.success) {
    yield put(
      showFlashMessage({ message: response.message, messageType: "success" })
    );
  } else {
    yield put(
      showFlashMessage({
        message: response.message,
        messageType: "error",
        errors: response.errors,
      })
    );
  }
}

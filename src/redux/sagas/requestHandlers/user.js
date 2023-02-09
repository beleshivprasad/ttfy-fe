import client from "../../../plugins/axios";

export function userLoginRequest(data) {
  return client.post("/user/login", data);
}
export function userRegisterRequest(data) {
  console.log(data)
  return client.post("/user/register", data);
}

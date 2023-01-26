import axios from "axios";
import { API_URL } from "../shared/constants";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const request = (url, params, method) => {
  const onSuccess = (res) => {
    console.log("Success Response", res);

    return res.data;
  };
  const onError = (error) => {
    console.log("Error Response", error.response ?? error);

    return error.response ?? error;
  };

  axiosInstance
    .request({
      url,
      method,
      params,
    })
    .then(onSuccess)
    .catch(onError);
};

const _get = (url, params) => {
  return request(url, params, "get");
};
const _post = (url, params) => {
  return request(url, params, "get");
};
const _put = (url, params) => {
  return request(url, params, "get");
};
const _delete = (url, params) => {
  return request(url, params, "get");
};

const client = {
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
};

export default client;

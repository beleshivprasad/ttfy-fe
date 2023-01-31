import axios from "axios";
import { API_URL } from "../shared/constants";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Setting Up Deafults

axiosInstance.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const request = async (url, params, method) => {
  const onSuccess = (res) => {
    console.log("Success Response", res.data);

    return res.data;
  };
  const onError = (res) => {
    console.log("Error Response", res.data);

    return res.data;
  };

  try {
    const res = await axiosInstance.request({
      url,
      method,
      params,
    });
    return onSuccess(res);
  } catch (error) {
    onError(error);
  }

  axiosInstance
    .request({
      url,
      method,
      params,
    })
    .then(onSuccess)
    .catch(onError);
};

const _get = async (url, params) => {
  return await request(url, params, "get");
};
const _post = async (url, params) => {
  return await request(url, params, "get");
};
const _put = async (url, params) => {
  return await request(url, params, "get");
};
const _delete = async (url, params) => {
  return await request(url, params, "get");
};

const client = {
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
};

export default client;

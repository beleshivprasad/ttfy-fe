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

const request = async (url, data, method) => {
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
      data,
    });
    return onSuccess(res);
  } catch (error) {
    return onError(error);
  }
};

const _get = async (url, data) => {
  return await request(url, data, "get");
};
const _post = async (url, data) => {
  return await request(url, data, "post");
};
const _put = async (url, data) => {
  return await request(url, data, "put");
};
const _delete = async (url, data) => {
  return await request(url, data, "delete");
};

const client = {
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
};

export default client;

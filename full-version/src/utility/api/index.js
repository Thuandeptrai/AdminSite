import axios from "axios"
import React from "react"

export const fetchApi = () => {
  const defaultOptions = {
    baseURL: "http://localhost:4000/api/v1",
    //baseURL: "https://api.gofiber.vn/api",

    method: "get" || "delete" || "post" || "patch",
    headers: {
      "Content-Type": "application/json"
    }
  }
  const instance = axios.create(defaultOptions);
  instance.interceptors.request.use(function () {
     const token = sessionStorage.getItem('access-token');
     config.headers['Authorization'] = token ? `${token}` : '';
    return config
  })
  return instance
}
export default fetchApi

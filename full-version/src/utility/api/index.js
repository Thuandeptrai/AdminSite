import axios from "axios"
import React from "react"

export const fetchApi = () => {
  const defaultOptions = {
    baseURL: "http://localhost:4000/api/v1",
    //baseURL: "https://api.gofiber.vn/api",

    method: "get" || "delete" || "post" || "patch",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData"))} `
    }
  }
  const instance = axios.create(defaultOptions);

  return instance
}
export default fetchApi

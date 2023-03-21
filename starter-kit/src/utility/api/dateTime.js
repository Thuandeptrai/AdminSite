import { fetchApi } from "."
import React from "react"

const pathname = "/workDay"
export const getWorkDateByUserId = async (userId) => {
  const url = `${pathname}/getUser/${userId}`
  try {
    const response = await fetchApi().get(url)
    console.log(response)
    return response
  } catch (error) {
    return error.response
  }
}
export const getSalary = async () => {
  try {
    const response = await fetchApi().get("/workDay/getSalary/Salary")

    return response.data
  } catch (error) {
    return error.response
  }
}

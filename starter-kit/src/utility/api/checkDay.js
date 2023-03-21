import { fetchApi } from "."
import React from "react"

const pathname = "/dateForUser"
export const checkInForUser = async () => {
  const url = `${pathname}/createDateForUser`
  try {
    const response = await fetchApi().post(url)

    return response
  } catch (error) {
    return error.response
  }
}
export const checkOutForUser = async () => {
    const url = `${pathname}/checkOutDateForUser`
    try {
      const response = await fetchApi().post(url)
  
      return response
    } catch (error) {
      return error.response
    }
  }
  export const getSalary = async () => {
    try {
      const response = await fetchApi().get("/workDay/Salary")
  
      return response
    } catch (error) {
      return error.response
    }
  }
  
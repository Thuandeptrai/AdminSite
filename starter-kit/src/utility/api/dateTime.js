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

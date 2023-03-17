import { fetchApi } from "."
import React from "react"

const pathname = "/users"
export const getUserAPI = async () => {
  const url = `${pathname}/getAll`
  try {
    const response = await fetchApi().get(url)

    return response
  } catch (error) {
    return error.response
  }
}
export const getCurrentUser = async () => {
  const url = `${pathname}/init`
  try {
    const response = await fetchApi().get(url)
    return response
  } catch (error) {
    return error
  }
}

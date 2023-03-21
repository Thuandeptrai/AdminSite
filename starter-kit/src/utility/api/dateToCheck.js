import React from "react"
import { fetchApi } from "."
const pathname = "/date"
export const getDateToCheck = async () => {
  const url = `${pathname}/getAll`
  try {
    const response = await fetchApi().get(url)
    return response
  } catch (error) {
    return error
  }
}
export const updateDateToCheck = async (id, data) => {
  const url = `${pathname}/update/${id}`
  try {
    const response = await fetchApi().put(url, data)
    return response
  } catch (error) {
    return error
  }
}

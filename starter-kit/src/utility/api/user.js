import { fetchApi } from "."
import React from "react"
import { deleteUser } from './../../views/user/store/index'

const pathname = "/users"
export const getUserAPI = async () => {
  const url = `${pathname}/getAll`
  console.log("url:", url)
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
export const updateUser = async (id, data) => {
  const url = `${pathname}/update/${id}`
  try {
    const response = await fetchApi().put(url, data)
    return response
  } catch (error) {
    return error
  }
}

export const insertUser = async (data) => {
  const url = `${pathname}/register`
  try {
    const response = await fetchApi().post(url, data)
    return response
  } catch (error) {
    return error
  }
}


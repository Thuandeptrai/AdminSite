import { fetchApi } from ".";
import React from "react";

const pathname = "/users";
export const getUserAPI = async () => {
  const url = `${pathname}/getAll`;
  try {
    const response = await fetchApi().get(url);

    return response;
  } catch (error) {
    throw error;
  }
};

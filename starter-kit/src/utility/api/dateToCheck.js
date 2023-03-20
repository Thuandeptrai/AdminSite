import React from "react";
import { fetchApi } from ".";
const pathname = "/date";
export const getDateToCheck = async () => {
  const url = `${pathname}/getAll`;
  try {
    const response = await fetchApi().get(url);
    return response;
  } catch (error) {
    return error;
  }
};

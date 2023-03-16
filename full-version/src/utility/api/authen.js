import { fetchApi } from ".";
import React from "react";

const pathname = "/auth";
export const loginUser = async (username, password) => {
  const url = `${pathname}/login`;
  try {
    const response = await fetchApi().post(url, { username, password });

    return response;
  } catch (error) {
    throw error;
  }
};

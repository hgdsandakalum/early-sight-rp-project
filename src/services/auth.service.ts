import { BACKEND_BASE_URL } from "@/config";
import { httpGet, httpPost } from "./http.service";
import { User } from "../../types/";

// const URL = `${BACKEND_BASE_URL}/auth`;
const URL = `${BACKEND_BASE_URL}/api`;

const getToken = async (userId: string, email: string) => {
  try {
    const response = await httpPost(`${URL}/token`, {
      userId: parseInt(userId, 10),
      email: email,
    });
    const data = response?.data;
    return data;
  } catch (error: any) {
    throw error?.data?.error;
  }
};

const refreshToken = async (userId: string, refreshToken: string) => {
  try {
    const response = await httpPost(`${URL}/token/refresh`, {
      userId: userId,
      refreshToken: refreshToken,
    });
    const data = response?.data;
    return data;
  } catch (error: any) {
    throw error?.data?.error;
  }
};

const convertToUser = (data: any): User => {
  return {
    id: data._id,
    fullName: data.fullName,
    designation: data.designation,
    username: data.username,
  };
};

const getCurrentUser = async (id: string): Promise<User> => {
  try {
    const response = await httpGet(`${URL}/user/${id}`);
    const data = response?.data;
    return convertToUser(data);
  } catch (error: any) {
    throw error?.data?.error;
  }
};

export { getToken, refreshToken, getCurrentUser };

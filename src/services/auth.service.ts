import { BACKEND_BASE_URL } from "@/config";
import { httpGet, httpPost } from "./http.service";

const URL = `${BACKEND_BASE_URL}/auth`;

const getToken = async (userId: string, email: string) => {
    try {
        const response = await httpPost(`${URL}/token`, {
            userId: parseInt(userId, 10),
            email: email,
        });
        const data = response?.data;
        return data;
    } catch (error:any) {
        throw error?.data?.error
    }
};

const refreshToken = async (userId: string, refreshToken: string) => {
    try {
        const response = await httpPost(`${URL}/token/refresh`,{
            userId: userId,
            refreshToken: refreshToken
        });
        const data = response?.data;
        return data;
    } catch (error:any) {
        throw error?.data?.error
    }
};

const getCurrentUser = async () => {
  try {
    const response = await httpGet(`${URL}/user`);
    const data = response?.data;
    return data;
  } catch (error:any) {
    throw error?.data?.error
  }
};

export { getToken, refreshToken, getCurrentUser };

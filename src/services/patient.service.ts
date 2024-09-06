import { BACKEND_BASE_URL2 } from "@/config";
import { httpGet, httpPost } from "./http.service";
import { Patient } from "../../types";

const URL = `${BACKEND_BASE_URL2}/api`;

const addPatient = async (userId: string, refreshToken: string) => {
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

const getAllPatient = async () => {
  try {
    const response = await httpGet(`${URL}/patient`);
    const data = response?.data;
    return data;
  } catch (error: any) {
    throw error?.data?.error;
  }
};

export { getAllPatient, addPatient };

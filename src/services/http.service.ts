import axiosInstance from "../config/axiosInstance.config";
import { AxiosRequestConfig } from "axios";

export const httpGet = (url: string) => {
  return axiosInstance.get(url);
};

export const httpPost = <T>(
  url: string,
  data: T,
  config?: AxiosRequestConfig
) => {
  return axiosInstance.post(url, data, {
    ...config,
    httpsAgent: new (require("https").Agent)({
      rejectUnauthorized: false,
    }),
  });
};

export const httpPut = <T>(url: string, data: T) => {
  return axiosInstance.put(url, data);
};

export const httpPatch = <T>(url: string, data: T) => {
  return axiosInstance.patch(url, data);
};

export const httpDelete = (url: string) => {
  return axiosInstance.delete(url);
};

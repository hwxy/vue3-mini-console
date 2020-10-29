import { AxiosRequestConfig, AxiosError } from "axios";
export const request = (config: AxiosRequestConfig) => {
  return config;
};

export const requestError = (error: AxiosError) => {
  return Promise.reject(error);
};

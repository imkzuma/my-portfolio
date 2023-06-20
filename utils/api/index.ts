import axios, { AxiosRequestConfig } from "axios";

const url = "https://official-site.tudemaha.my.id/";

export const OfficialApi = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});

OfficialApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth-token");

  if (token) {
    config.headers.authorization = token;
  }

  return config;
});

OfficialApi.interceptors.response.use((response) => {
  const newToken = response.headers.authorization;

  if (newToken) {
    localStorage.setItem("auth-token", newToken);
  }

  return response;
}, (error) => {
  return Promise.reject(error);
})
import axios from "axios";

const url = "https://official-site.tudemaha.my.id/";

export const OfficialApi = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});

export const ChatbotApi = axios.create({
  baseURL: "http://20.205.112.214:5000/",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
})

OfficialApi.interceptors.request.use((config) => {
  const user = localStorage.getItem("@portfolio/user");

  if (user) {
    const token = JSON.parse(user).token;
    config.headers.authorization = token;
  }

  return config;
});

OfficialApi.interceptors.response.use((response) => {
  const newToken = response.headers.authorization;

  if (newToken) {
    const user = localStorage.getItem('@portfolio/user');
    let parsedUser: { token?: string } = {};

    if (user) {
      parsedUser = JSON.parse(user);
    }

    parsedUser.token = newToken;
    localStorage.setItem('@portfolio/user', JSON.stringify(parsedUser));
  }

  return response;
}, (error) => {
  return Promise.reject(error);
});


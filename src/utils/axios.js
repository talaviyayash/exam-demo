import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://examination.onrender.com",
  timeout: 3000,
  headers: {
    "X-Custom-Header": "foobar",
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

const callApi = async ({ method, url, data, config }) => {
  const response = await axiosInstance({ method, url, data, config });
  return response.data;
};

// callApi({
//   url: "/users/Login",
//   method: "post",
//   data: {
//     email: "somyarudra@yopmail.com",
//     password: "111111",
//   },
// });

export default callApi;

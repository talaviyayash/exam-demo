import axios from "axios";
import { toastError } from "./toastFunction";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Cache-Control": "no-cache",
    "X-Custom-Header": "foobar",
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

const callApi = async (props) => {
  try {
    const response = await axiosInstance({ ...props });
    return response.data;
  } catch (error) {
    toastError(error);
    return error.response;
  }
};

export default callApi;

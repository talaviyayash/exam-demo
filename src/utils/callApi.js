import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "https://examination.onrender.com",
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
    toast.error(error);
  }
};

export default callApi;

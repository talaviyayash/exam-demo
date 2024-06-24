import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://examination.onrender.com",
  headers: {
    "Cache-Control": "no-cache",
    "X-Custom-Header": "foobar",
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

const CallApi = async (props) => {
  try {
    const response = await axiosInstance({ ...props });
    return response.data;
  } catch (error) {
    return error;
  }
};

export default CallApi;

import { useEffect, useState } from "react";
import lSGetItem from "../../../hook/lSGetItem";
import axios from "../../../utils/axios";
import { STUDENT_DETAIL_URL } from "../../../description/api.description";

const ShowStudentDetailContainer = () => {
  const [rows, setRows] = useState([]);
  const userInfo = lSGetItem("userInfo");

  useEffect(() => {
    const getAllStudentData = async () => {
      const response = await axios({
        url: STUDENT_DETAIL_URL,
        method: "get",
        headers: {
          "access-token": userInfo.token,
        },
      });
      console.log(response.data);
      setRows(response.data);
    };
    getAllStudentData();
  }, []);
  return {};
};

export default ShowStudentDetailContainer;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { SHOW_EXAM_URL } from "./api.description";
import GetItem from "../hook/GetItem";
const ShowExamContainer = () => {
  const [allExam, setAllExam] = useState([]);
  const userInfo = GetItem("userInfo");
  const navigate = useNavigate();
  const allExamApi = async () => {
    const response = await axios({
      url: SHOW_EXAM_URL,
      method: "get",
      headers: {
        "access-token": userInfo.token,
      },
    });
    if (response.statusCode === 200) {
      setAllExam(response.data);
    }
  };

  const editExam = (id) => {
    navigate(`/edit-exam/${id}`);
  };

  useEffect(() => {
    allExamApi();
  }, []);
  return {
    allExam,
    editExam,
  };
};

export default ShowExamContainer;

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

import {
  DELETE_EXAM_URL,
  SHOW_EXAM_URL,
} from "../../../description/api.description";
import lSGetItem from "../../../hook/lSGetItem";
import lSClear from "../../../hook/lSClear";
import { logOutSuccess } from "../../../redux/slice/userInfoSlice";

const ShowExamContainer = () => {
  const [allExam, setAllExam] = useState([]);
  const userInfo = lSGetItem("userInfo");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    } else if (response.statusCode === 401) {
      lSClear();
      dispatch(logOutSuccess());
    }
  };

  const editExamNavigate = (subject, id) => {
    navigate(`/edit-exam/${subject}/${id}`);
  };

  const viewExamNavigate = (subject, id) => {
    navigate(`/view-in-detail/${subject}/${id}`);
  };

  const deleteExam = async (id) => {
    const response = await axios({
      url: DELETE_EXAM_URL,
      method: "delete",
      headers: {
        "access-token": userInfo.token,
      },
      params: {
        id,
      },
    });
    if (response.statusCode === 200) {
      allExamApi();
    } else if (response.statusCode === 401) {
      lSClear();
      dispatch(logOutSuccess());
    }
  };

  useEffect(() => {
    allExamApi();
  }, []);
  return {
    allExam,
    editExamNavigate,
    deleteExam,
    viewExamNavigate,
  };
};

export default ShowExamContainer;

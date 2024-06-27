import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import callApi from "../../../utils/callApi";
import { useNavigate } from "react-router-dom";

import {
  DELETE_EXAM_URL,
  SHOW_EXAM_URL,
} from "../../../description/api.description";
import lSClear from "../../../hook/lSClear";
import { toast } from "react-toastify";
import { logOutSuccess } from "../../../redux/slice/userInfoSlice";

const ShowExamContainer = () => {
  const [allExam, setAllExam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = useSelector((state) => state.userInformation.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allExamApi = async () => {
    setIsLoading(true);
    const response = await callApi({
      url: SHOW_EXAM_URL,
      method: "get",
      headers: {
        "access-token": userInfo.token,
      },
    });
    if (response.statusCode === 200) {
      setAllExam(response.data);
    } else {
      if (response.statusCode === 401) {
        dispatch(logOutSuccess());
        lSClear();
      }
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  const editExamNavigate = (subject, id) => {
    navigate(`/edit-exam/${subject}/${id}`);
  };

  const viewExamNavigate = (subject, id) => {
    navigate(`/view-in-detail/${subject}/${id}`);
  };

  const deleteExam = async (id) => {
    const isApproved = window.confirm(
      "Are you sure you want to delete this exam?"
    );
    if (!isApproved) {
      return null;
    }
    setIsLoading(true);
    const response = await callApi({
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
      await allExamApi();
      toast.success(response.message);
    } else {
      if (response.statusCode === 401) {
        lSClear();
        dispatch(logOutSuccess());
      }
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    allExamApi();
  }, []);
  return {
    allExam,
    editExamNavigate,
    isLoading,
    deleteExam,
    viewExamNavigate,
  };
};

export default ShowExamContainer;

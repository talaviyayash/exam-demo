import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  DELETE_EXAM_URL,
  SHOW_EXAM_URL,
} from "../../../description/api.description";

import useApi from "../../../hook/useApi";
import {
  DELETE_EXAM_STATE,
  SHOW_EXAM_STATE,
} from "../../../description/teacher/showExam.description";
import { API_STATE } from "../../../utils/constants";
import { toast } from "react-toastify";
import { toastSuccess } from "../../../utils/toastFunction";

const ShowExamContainer = () => {
  const userInfo = useSelector((state) => state.userInformation.userInfo);
  const { isLoading, data: allExam } =
    useSelector((state) => state?.[API_STATE]?.[SHOW_EXAM_STATE]) ?? {};
  console.log(isLoading);
  const { isLoading: deleteIsLoading } =
    useSelector((state) => state?.[API_STATE]?.[DELETE_EXAM_STATE]) ?? {};
  const navigate = useNavigate();
  const apiCaller = useApi();
  const dispatch = useDispatch();

  const allExamApi = async () => {
    const axiosConfig = {
      url: SHOW_EXAM_URL,
      method: "get",
      headers: {
        "access-token": userInfo.token,
      },
    };
    await apiCaller({
      axiosConfig,
      loadingStatuesName: SHOW_EXAM_STATE,
      showToast: false,
      apiHasToCancel: true,
    });
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
    const axiosConfig = {
      url: DELETE_EXAM_URL,
      method: "delete",
      headers: {
        "access-token": userInfo.token,
      },
      params: {
        id,
      },
    };
    await apiCaller({
      axiosConfig,
      loadingStatuesName: DELETE_EXAM_STATE,
      apiHasToCancel: true,
    });
    await allExamApi();
    toastSuccess(`Delete exam  successfully`);
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
    deleteIsLoading,
  };
};

export default ShowExamContainer;

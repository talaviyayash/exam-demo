import { useDispatch } from "react-redux";
import callApi from "../utils/callApi";
import {
  addErrorState,
  addLoadingState,
  addSuccessState,
} from "../redux/slice/apiLoadingSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { logOutSuccess } from "../redux/slice/userInfoSlice";
import { useNavigate } from "react-router-dom";
import { SIGN_IN_PATH } from "../utils/constants";
import { toastError, toastSuccess } from "../utils/toastFunction";

const useApi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [controller, setController] = useState([]);
  useEffect(() => {
    return () => {
      let controllerInArray = controller;
      setController((prev) => {
        controllerInArray = prev;
        return prev;
      });
      controllerInArray.forEach(({ controller, apiHasToCancel }) => {
        if (apiHasToCancel) controller.abort();
      });
    };
  }, [controller]);

  return async ({
    axiosConfig,
    apiHasToCancel,
    loadingStatuesName,
    apiController,
    showToast,
    toastMsg,
    errorToastMsg,
    successFunction,
    errorFunction,
  }) => {
    const newController = apiController ?? new AbortController();
    setController((prev) => {
      prev.push({ controller: newController, apiHasToCancel });
      return prev;
    });
    dispatch(addLoadingState({ name: loadingStatuesName }));

    const response = await callApi({
      ...axiosConfig,
      signal: newController.signal,
    });

    if (response) {
      if (response.statusCode === 200) {
        if (successFunction) successFunction(response);
        dispatch(
          addSuccessState({ name: loadingStatuesName, data: response.data })
        );
        if (showToast) toastSuccess(toastMsg || response.message);
        return { ...response, isError: false, isApiCancelled: false };
      } else {
        dispatch(addErrorState({ name: loadingStatuesName }));
        if (response.statusCode === 401) {
          dispatch(logOutSuccess());
          toastError(errorToastMsg || response.message);
          navigate(SIGN_IN_PATH);
        } else {
          if (showToast) toastError(response.message);
        }
        if (errorFunction) errorFunction(response);
        return { ...response, isError: true, isApiCancelled: false };
      }
    }
    return {
      isApiCancelled: true,
    };
  };
};

export default useApi;

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ONE_STUDENT_DETAIL_URL } from "../../../description/api.description";
import { useSelector } from "react-redux";
import { LOADING_STATE_OF_STUDENT } from "../../../description/teacher/oneStudentInDetail.description";
import { addDataState } from "../../../redux/slice/apiLoadingSlice";
import useAllHook from "../../../hook/useAllHook";

const OneStudentInDetailContainer = () => {
  const { id } = useParams();
  const { apiCaller, dispatch } = useAllHook();
  const { isLoading, data: studentInfo = [] } =
    useSelector((state) => state?.apiState?.[LOADING_STATE_OF_STUDENT]) ?? {};

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const axiosConfig = {
        url: ONE_STUDENT_DETAIL_URL,
        method: "get",
        params: {
          id,
        },
      };
      const successFunction = (response) => {
        dispatch(
          addDataState({
            name: LOADING_STATE_OF_STUDENT,
            data: response.data[0],
          })
        );
      };
      await apiCaller({
        axiosConfig,
        loadingStatuesName: LOADING_STATE_OF_STUDENT,
        showToast: false,
        apiHasToCancel: true,
        successFunction,
      });
    };

    fetchStudentDetails();
  }, []);
  return {
    studentInfo,
    isLoading,
  };
};

export default OneStudentInDetailContainer;

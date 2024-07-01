import useApi from "./useApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const useAllHook = () => {
  const apiCaller = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return {
    apiCaller,
    navigate,
    dispatch,
  };
};

export default useAllHook;
